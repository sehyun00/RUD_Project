// feature
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

// scss
import '../../assets/css/stockTable.scss';

// components
import TableDO from "./tableDO"; // 국내 컴포넌트
import TableFO from "./tableFO"; // 해외 컴포넌트

// images
import checkicon from '../../assets/images/checkmark.png';

// StockTable 컴포넌트 정의
const StockTable = ({Reload, SD}) => {
    const [activeButton, setActiveButton] = useState("국장");
    const [exchangeRate, setExchangeRate] = useState(0);
    const [loading, setLoading] = useState(false);  
    const [currentTime, setCurrentTime] = useState('');
    const [stockData, setStockData] = useState({"국장": [], "해외장": []});
    const [currentData, setCurrentData] = useState(stockData["국장"]);
    
    useEffect(() => {
        const updateTime = () => {  
            const now = new Date();
            setCurrentTime(now.toLocaleString()); // 현재 시간을 문자열로 설정
        };

        updateTime(); // 컴포넌트가 마운트될 때 현재 시간 설정
        const intervalId = setInterval(updateTime); // 1초마다 시간 업데이트

        return() => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    const [desiredWeights, setDesiredWeights] = useState({
        "국장": Array(stockData["국장"].length).fill(0),
        "해외장": Array(stockData["해외장"].length).fill(0)
    });

    const fetchStockPrices = async () => {
        if (loading) 
            return;
    
        try {

            const domesticStocks = SD.stock?.국장 || [];
            const foreignStocks = SD.stock?.해외장 || [];
            const domesticMoney = Number(SD.cash.원화.replace(/,/g, ''));
            const foreignMoney = Number(SD.cash.달러.replace(/,/g, ''));
            console.log(SD.cash.달러)   
    
            const domesticData = domesticStocks.reduce((acc, curr, index) => {
                if (index % 2 === 0) {
                    const quantity = domesticStocks[index + 1] || 1;
                    acc.push({
                        id: acc.length + 3,
                        name: curr,
                        quantity: parseInt(quantity),
                        price: 0,
                        currentPrice: 0,
                        marketType: '국장'
                    }); 
                }
                return acc;
            }, []);
    
            const foreignData = foreignStocks.reduce((acc, curr, index) => {
                if (index % 2 === 0) {
                    const quantity = foreignStocks[index + 1] || 1;
                    acc.push({
                        id: acc.length + domesticData.length + 3,
                        name: curr,
                        quantity: parseInt(quantity),
                        price: 0,
                        currentPrice: 0,
                        marketType: '해외장'
                    });
                }
                return acc;
            }, []);
    
            // 가격을 가져올 종목 리스트 생성
            const allStocks = [
                ...domesticData,
                ...foreignData
            ];  
    
            // 종가를 순차적으로 가져오기
            for (const stock of allStocks) {
                stock.price = await fetchStockPrice(stock.name, stock.marketType); // currentPrice에 가격 저장
                stock.currentPrice = await stock.price * stock.quantity;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
    
            // 현금 정보를 stockData에 추가
            const cashDataKRW = {
                id: 1,
                name: '원화',
                quantity: false, // 현금은 수량으로 1로 설정
                price: false, // price는 0으로 설정
                currentPrice: domesticMoney, // 원화의 현재 가격을 currentPrice에 저장
                marketType: '국장'
            };
    
            const cashDataUSD = {
                id: 2,
                name: '달러',
                quantity: false, // 현금은 수량으로 1로 설정
                price: false, // price는 0으로 설정
                currentPrice: foreignMoney, // 달러의 현재 가격을 currentPrice에 저장
                marketType: '해외장'
            };      
            setStockData({"국장": [cashDataKRW, ...domesticData], "해외장": [cashDataUSD, ...foreignData]});
    
        } catch (error) {
            console.error("종가를 가져오는 데 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockPrices();
    }, [SD]);

    const fetchStockPrice = async (stockName, marketType) => {
        try {
            const endpoint = marketType === '국장'
                ? `http://localhost:5001/getkos?name=${stockName}`
                : `http://localhost:5001/getnas?name=${stockName}`;

            const response = await axios.get(endpoint);
            if (response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error("종가를 가져오는 데 오류가 발생했습니다.", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get(
                    'https://api.exchangerate-api.com/v4/latest/USD'
                );
                setExchangeRate(response.data.rates.KRW);
            } catch (error) {
                console.error("환율을 가져오는 데 오류가 발생했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRate();
    }, []);

    useEffect(() => {
        setCurrentData(stockData[activeButton]);
    }, [activeButton, stockData]);

    const formatCurrency = (amount, isForeign) => {
        const options = {
            style: 'decimal',
            minimumFractionDigits: isForeign
                ? 2
                : 0,
            maximumFractionDigits: isForeign
                ? 2
                : 0
        };
        const formattedAmount = new Intl
            .NumberFormat('ko-KR', options)
            .format(amount);
        return isForeign
            ? `$ ${formattedAmount}`
            : `₩ ${formattedAmount}`;

    };

    const calculateCurrentTotalBalance = () => {
        const domesticTotal = stockData["국장"].reduce(
            (sum, item) => sum + item.currentPrice,
            0
        );
        const foreignTotal = stockData["해외장"].reduce(
            (sum, item) => sum + item.currentPrice,
            0
        );
        return activeButton === "국장"
            ? domesticTotal + (foreignTotal * exchangeRate)
            : (domesticTotal / exchangeRate) + foreignTotal;
    };

    const handleReloadClick = () => {
        if (window.confirm("재업로드 하시겠습니까? 기존에 입력한 내용은 사라집니다.")) {
            Reload();
        }
    };

    const handleChange = (index, field, value) => {
        const newData = [...currentData];
        newData.currentPrice = newData.quantity * newData.price;

        // 만약 index가 currentData의 길이와 같다면 새로운 행 추가
        if (index === newData.length) {
            newData.push(value); // 새로운 빈 데이터 추가
        } else {
            newData[index][field] = value; // 기존 데이터 수정
        }

        setCurrentData(newData);
    };  

    const handleButtonClick = (clickButton) => {
        setActiveButton(clickButton);
        setCurrentData(stockData[clickButton]);
    };

    const handleWeightChange = (index, value) => {
        const newWeights = {
            ...desiredWeights
        };
        newWeights[activeButton][index] = value;
        setDesiredWeights(newWeights);
    };

    const totalDesiredWeight = desiredWeights["국장"].reduce(
        (total, weight) => total + (parseFloat(weight) || 0),
        0
    ) + desiredWeights["해외장"].reduce(
        (total, weight) => total + (parseFloat(weight) || 0),
        0
    );

    const currentTotalBalance = calculateCurrentTotalBalance();

    const addEmptyRow = async () => {
    
        const newRow = {
            id: currentData.length + 2, // 새로운 ID 생성
            name: '',
            quantity: 0,
            price: null,
            currentPrice: 0,
            marketType: activeButton
        };

        // 현재 활성화된 버튼에 따라 적절한 데이터 상태에 추가
        setStockData(prevState => ({
            ...prevState,
            [activeButton]: [
                ...prevState[activeButton],
                newRow
            ] // 현재 활성화된 마켓에 추가
        }));

        // currentData도 업데이트
        setCurrentData(prevData => [
            ...prevData,
            newRow
        ]);
    };

    // 주식 검색 버튼
    const searchButton = (item, index) => {
        const fetchPriceAndUpdate = async () => {
            const marketType = item.marketType;
            const stockName = item.name;
            try {
                const endpoint = marketType === '국장'
                    ? `http://localhost:5001/getkos?name=${stockName}`
                    : `http://localhost:5001/getnas?name=${stockName}`;
    
                const response = await axios.get(endpoint); 
                const updatedPrice = response.data; // API 호출로 받은 가격
                const updatadCurrentPrice = updatedPrice * item.quantity;
                handleChange(index, 'price', updatedPrice); // 가격 업데이트
                handleChange(index, 'currentPrice', updatadCurrentPrice);
            } catch (error) {
                console.error("주식 가격을 가져오는 데 오류가 발생했습니다.", error);
            }
        };
        return (
            <td className="option-button">
                {item.price === null && 
                <img 
                    src ={checkicon} 
                    className="check-icon"
                    onClick={fetchPriceAndUpdate}
                />
                }
                {item.price === '0' && 
                <img 
                    src ={checkicon} 
                    className="check-icon"
                    onClick={fetchPriceAndUpdate}
                />
                }
            </td>
        );
    };

    if (loading) {
        return <div>환율을 로딩 중...</div>;
    }

    const fetchDesiredWeights = async () => {
        const stockNames = [...stockData["국장"].map(stock => stock.name), ...stockData["해외장"].map(stock => stock.name)];
        const stockNamesString = stockNames.join(',');
    
        try {
            const response = await axios.get(`http://localhost:5004/?stock_names=${stockNamesString}`);
            const weights = response.data;
    
            // weights 객체를 원하는 형식으로 변환하여 상태 업데이트
            const newWeights = {
                "국장": stockData["국장"].map(stock => weights[stock.name] ? weights[stock.name] : "0"),
                "해외장": stockData["해외장"].map(stock => weights[stock.name] ? weights[stock.name] : "0")
            };
            
            setDesiredWeights(newWeights);

        } catch (error) {
            console.error("비중 추천을 가져오는 데 오류가 발생했습니다.", error);
        }
    };

    return (
        <div className="stock-container">
            <div className="name-container">
                <h1>StockTable</h1>
                <p>{currentTime}</p>
            </div>
            <div className="switch-container">
                <div className="table-switch-wrapper">
                    <div className="table-switch">
                        <div className="switch-right">
                            <div
                                className={`table-choice ${activeButton === '국장'
                                    ? 'active'
                                    : ''}`}
                                onClick={() => handleButtonClick('국장')}>
                                <span>국내</span>
                            </div>
                            <div
                                className={`table-choice ${activeButton === '해외장'
                                    ? 'active'
                                    : ''}`}
                                onClick={() => handleButtonClick('해외장')}>
                                <span>해외</span>
                            </div>
                            <div className="image-reload" onClick={handleReloadClick}>
                                <span>이미지 재업로드</span>
                            </div>
                        </div>
                        <div className="switch-left">
                            <div onClick={fetchDesiredWeights}>희망 비중 추천받기</div>
                            <div>저장하기</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container">   
                <div className="table-wrapper">
                    {
                        activeButton === '국장'
                            ? <TableDO
                                    data={currentData}
                                    totalBalance={calculateCurrentTotalBalance()}
                                    handleChange={handleChange}
                                    desiredWeights={desiredWeights["국장"]}
                                    handleWeightChange={handleWeightChange}
                                    currentTotalBalance={currentTotalBalance}
                                    totalDesiredWeight={totalDesiredWeight}
                                    addEmptyRow={addEmptyRow}
                                    searchButton={searchButton}/>
                            : <TableFO
                                    data={currentData}
                                    totalBalance={calculateCurrentTotalBalance()}
                                    handleChange={handleChange}
                                    desiredWeights={desiredWeights["해외장"]}
                                    handleWeightChange={handleWeightChange}
                                    currentTotalBalance={currentTotalBalance}
                                    totalDesiredWeight={totalDesiredWeight}
                                    addEmptyRow={addEmptyRow}
                                    searchButton={searchButton}/>
                    }
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th className="th"></th>
                                <th className="th">총합</th>
                                <th className="th"></th>
                                <th className="th">{formatCurrency(currentTotalBalance, activeButton === '해외장')}</th>
                                <th className="th"></th>
                                <th className="th">{totalDesiredWeight}</th>
                                <th className="th">{/*  */}</th>
                                <th className="th">{/*  */}</th>
                                <th className="th">{/*  */}</th>
                                <th className="th">{/*  */}</th>
                                <th className="option-button"></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    );
};

// PropTypes로 prop의 타입 정의
StockTable.propTypes = {
    Reload: PropTypes.func.isRequired, // 재업로드 함수
};

export default StockTable;
