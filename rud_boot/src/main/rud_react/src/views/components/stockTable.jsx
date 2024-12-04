// app/home/stockTable

import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';

// scss
import '../../assets/css/stockTable.scss';

// components
import TableDO from "./tableDO"; // 국내 컴포넌트
import TableFO from "./tableFO"; // 해외 컴포넌트
import LoadingPage from '../componentItems/loading'; 
import StockTableModal from "../componentItems/stockTableModal";

// images
import checkicon from '../../assets/images/checkmark.png';
import deleteicon from '../../assets/images/trashcan.png';
import questionmarkImage from '../../assets/images/questionmark.png';

Modal.setAppElement('#root');

// StockTable 컴포넌트 정의
const StockTable = ({Reload, SD, setLoading, setProgress, loading, progress, currentTheme}) => {
    const [activeButton, setActiveButton] = useState("국장");
    const [exchangeRate, setExchangeRate] = useState(0);
    const [currentTime, setCurrentTime] = useState('');
    const [stockData, setStockData] = useState({"국장": [], "해외장": []});
    const [currentData, setCurrentData] = useState(stockData["국장"]);
    const [totalDesiredWeight, setTotalDesiredWeight] = useState(0);
    const [desiredWeights, setDesiredWeights] = useState({
        "국장": Array(stockData["국장"].length).fill(0),
        "해외장": Array(stockData["해외장"].length).fill(0)
    });
    const [stockNumber, setStockNumber] =useState(0);
    const [allStocksNumber, setAllStocksNumber] =useState(0);
    
    const [isModalOpen, setModalOpen] = useState(() => {
        const savedOpen = localStorage.getItem('isModalOpen');
        return savedOpen === 'true'; // 로컬 스토리지에서 boolean 값으로 변환
    });

    useEffect(() => {
        console.log(currentData);
    },[stockData]);

    const updateTime = () => {  
        const now = new Date();
        setCurrentTime(now.toLocaleString()); // 현재 시간을 문자열로 설정
    };

    useEffect(() => {
        updateTime(); // 컴포넌트가 마운트될 때 현재 시간 설정
    }, [stockData]);
    const fetchStockPrices = async () => {
        try {
            const domesticStocks = SD.stock?.국장 || [];
            const foreignStocks = SD.stock?.해외장 || [];
            const domesticMoney = Number(SD.cash.원화.replace(/,/g, ''));
            const foreignMoney = Number(SD.cash.달러.replace(/,/g, ''));
    
            const domesticData = domesticStocks.reduce((acc, curr, index) => {
                if (index % 2 === 0) {
                    const quantity = domesticStocks[index + 1] || 1;
                    acc.push({
                        id: acc.length + 3,
                        name: curr,
                        quantity: parseInt(quantity),
                        price: 0,
                        currentPrice: 0,
                        rebalancingRatio:0,
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
                        rebalancingRatio:0,
                        marketType: '해외장'
                    });
                }
                return acc;
            }, []);
    
            // 가격을 불러올 종목 리스트 생성
            const allStocks = [
                ...domesticData,
                ...foreignData
            ];  
            let asn = allStocks.length, sn = 0;
            setAllStocksNumber(asn);
    
            // 현금 정보를 stockData에 추가
            const cashDataKRW = {
                id: 1,
                name: '원화',
                quantity: false, // 현금은 수량으로 1로 설정
                price: false, // price는 0으로 설정
                currentPrice: domesticMoney, // 원화의 현재 가격을 currentPrice에 저장
                rebalancingRatio:0,
                marketType: '국장'
            };
    
            const cashDataUSD = {
                id: 2,
                name: '달러',
                quantity: false, // 현금은 수량으로 1로 설정
                price: false, // price는 0으로 설정
                currentPrice: foreignMoney, // 달러의 현재 가격을 currentPrice에 저장
                rebalancingRatio:0,
                marketType: '해외장'
            };   

            // 종가를 순차적으로 불러오기
            for (const stock of allStocks) {
                try {
                    console.log(`Fetching price for ${stock.name}...`);
                    stock.price = await fetchStockPrice(stock.name, stock.marketType);
                    stock.currentPrice = await stock.price * stock.quantity;
                } catch (err) {
                    console.error(`Error fetching price for ${stock.name}:`, err);
                    stock.price = 0; // 기본값 처리
                    stock.currentPrice = 0; // 기본값 처리
                }
                sn++;
                setLoading(stock.name);
                setProgress((sn / asn) * 100);
                setStockNumber(sn);
                await new Promise(resolve => setTimeout(resolve, 400));     // 비동기 대기  
                setStockData({"국장": [cashDataKRW, ...domesticData], "해외장": [cashDataUSD, ...foreignData]});
            }
            updateTime();

        } catch (error) {
            console.error("종가를 불러오는 데 오류가 발생했습니다.", error);
        } finally {
            await new Promise(resolve => setTimeout(resolve, 600)); 
            setLoading('0');
            setProgress(0);
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
            console.error("종가를 불러오는 데 오류가 발생했습니다.", error);
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
                console.error("환율을 불러오는 데 오류가 발생했습니다.", error);
            } finally {
                setLoading("0");
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

    useEffect(() => {
        const total = desiredWeights["국장"].reduce(
            (total, weight) => total + (parseFloat(weight) || 0),
            0
        ) + desiredWeights["해외장"].reduce(
            (total, weight) => total + (parseFloat(weight) || 0),
            0
        );
        setTotalDesiredWeight(total);
    }, [desiredWeights]);

    useEffect(() => {
        // totalDesiredWeight가 변경될 때마다 rebalancingRatio 업데이트
        if (totalDesiredWeight > 0) {
            stockData[activeButton].forEach((stock, index) => {
                stock.rebalancingRatio = (desiredWeights[activeButton][index] / totalDesiredWeight) * 100;
            });
        }
    }, [totalDesiredWeight, desiredWeights, activeButton, stockData, currentTime]);
    
    const handleWeightChange = (index, value) => {
        const newWeights = {
            ...desiredWeights
        };
        newWeights[activeButton][index] = value;
        setDesiredWeights(newWeights);
    };

    const currentTotalBalance = calculateCurrentTotalBalance();

    const addEmptyRow = async () => {
    
        const newRow = {
            id: currentData.length + 2, // 새로운 ID 생성
            name: '',
            quantity: 0,
            price: null,
            currentPrice: 0,
            rebalancingRatio:0,
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
            console.log(item, index);
            const marketType = item.marketType;
            const stockName = item.name;
            try {
                const endpoint = marketType === '국장'
                    ? `http://localhost:5001/getkos?name=${stockName}`
                    : `http://localhost:5001/getnas?name=${stockName}`;

                const response = await axios.get(endpoint); 
                const updatedPrice = response.data; // API 호출로 받은 가격
                const updatedCurrentPrice = updatedPrice * item.quantity;

                handleChange(index, 'price', updatedPrice); // 가격 업데이트
                handleChange(index, 'currentPrice', updatedCurrentPrice);
            } catch (error) {
                console.error("주식 가격을 불러오는 데 오류가 발생했습니다.", error);
            }
        };

        return (
            <td className="option-button">
                {(item.price === null || item.price === '0') && (
                    <img 
                        src={checkicon} 
                        className="check-icon"
                        onClick={fetchPriceAndUpdate}
                        alt="Check Icon" // 접근성을 위한 alt 속성 추가
                    />
                )}
            </td>
        );
    };


    // 행 제거 버튼
    const deleteButton =(marketType, index) => {
        const deletestock = () => {
            setStockData(prevStockData => ({
                ...prevStockData,
                [marketType]: prevStockData[marketType].filter((_, i) => i !== index)
            }));
        }

        return (
            <td className="option-button">
                <img
                    src ={deleteicon} 
                    className="delete-icon"
                    onClick={deletestock}
                />
            </td>
        );
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
            
            updateTime();
            setDesiredWeights(newWeights);

            // for (const stock of allStocks) {
                
            //     stock.rebalancingRatio = weights[stock.name];
            // };


        } catch (error) {
            console.error("비중 추천을 불러오는 데 오류가 발생했습니다.", error);
        }
    };

    const saveDataToDB = async () => {
        const userId = "zxcv"; // 임의의 사용자 ID
        const rudDate = currentTime.split(",")[0]; // 현재 날짜
        const allStocks = [...stockData["국장"], ...stockData["해외장"]];
        const won = stockData['국장'].find(stock => stock.name === '원화')?.currentPrice || 0; 
        const dollar = stockData['해외장'].find(stock => stock.name === '달러')?.currentPrice || 0; 
        const wonPer = stockData['국장'].find(stock => stock.name === '원화')?.rebalancingRatio || 0; 
        const dollarPer = stockData['해외장'].find(stock => stock.name === '달러')?.rebalancingRatio || 0; 
        let totalError = false;

        // 널, 0 값 체크
        for (const stock of allStocks) {
            const check = (stock.currentPrice === 0 || stock.currentPrice === null) ? false : true
            if (check === false ) {
                alert('주식의 가격이 0이거나 유효하지 않습니다. 함수를 종료합니다.');
                return; 
            }
            
        }

        // 널, 0이 아니라면 실행
        for (const stock of allStocks) {
            const payload = (stock.name === '원화' || stock.name === '달러') ? {
                userId,
                rudDate,
                exchange: exchangeRate,
                won,
                wonPer,
                dollar,
                dollarPer,
            } : {
                userId,
                rudDate,
                stockName: stock.name,
                marketOrder: stock.price,
                nos: stock.quantity,
                expertPer: stock.rebalancingRatio,
                paul: stock.marketType === "국장" ? false : true,
            }

            try {
                const endpoint = (stock.name === '원화' || stock.name === '달러')
                    ? 'http://localhost:8081/wallet/save'
                    : 'http://localhost:8081/rud/save';

                await axios.post(endpoint, payload);
                console.log(`${stock.name}의 데이터가 저장되었습니다.`);
            } catch (error) {
                console.error(`${stock.name}의 데이터 저장 중 오류 발생:`, error);
                totalError = true;
            }
        }
        if (totalError === false) {
            alert('저장이 완료 됐습니다!')
        } else {
            alert('저장 중 오류가 발생했습니다!')
        }
    };
    
    const toggleModal = () => {
        setModalOpen(!isModalOpen); // 모달 열기/닫기 토글
    };
    
    useEffect(() => {
        localStorage.setItem('isModalOpen', isModalOpen);
    }, [isModalOpen]);
    

    return (
        <div className="stock-container" style={{ backgroundColor: currentTheme.colors.Bg}}>
            <LoadingPage 
            loading={loading} 
            progress={progress} 
            stockNumber ={stockNumber} 
            allStocksNumber={allStocksNumber}
            />
            <StockTableModal isModalOpen={isModalOpen} toggleModal={toggleModal} currentTheme={currentTheme} />
            <div className="name-container">
                <h1 style={{ color: currentTheme.colors.MainFont}}>StockTable</h1>
                <p style={{ color: currentTheme.colors.MainFont}}>{currentTime}</p>
            </div>
            <div className="switch-container">
                <div className="table-switch-wrapper" style={{ backgroundColor: currentTheme.colors.SwitchWrapper}}>
                    <div className="table-switch">
                        <div className="switch-left">
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
                            <img
                                className="questionmark"
                                src={questionmarkImage}
                                onClick={toggleModal}
                                alt="질문 마크"/>
                        </div>
                        <div className="switch-right">
                            <div className="DesiredWeight-recommend" onClick={fetchDesiredWeights}>
                                <span>희망 비중 추천받기</span>
                            </div>
                            <div className="save-table" onClick={saveDataToDB}>
                                <span>저장하기</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container">   
                <div className="table-wrapper" style={{ backgroundColor: currentTheme.colors.TableBg}}>
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
                                    searchButton={searchButton}
                                    deleteButton={deleteButton}
                                    fetchStockPrice={fetchStockPrice}
                                    currentTheme={currentTheme}
                                    />
                            : <TableFO
                                    data={currentData}
                                    totalBalance={calculateCurrentTotalBalance()}
                                    handleChange={handleChange}
                                    desiredWeights={desiredWeights["해외장"]}
                                    handleWeightChange={handleWeightChange}
                                    currentTotalBalance={currentTotalBalance}
                                    totalDesiredWeight={totalDesiredWeight}
                                    addEmptyRow={addEmptyRow}
                                    searchButton={searchButton}
                                    deleteButton={deleteButton}
                                    fetchStockPrice={fetchStockPrice}
                                    currentTheme={currentTheme}
                                    />
                    }
                    <table className="custom-table">
                        <thead style={{ backgroundColor: currentTheme.colors.TheadBg, color: currentTheme.colors.TableText }}>
                            <tr>
                                <th className="th"></th>
                                <th className="th">총합</th>
                                <th className="th"></th>
                                <th className="th">{formatCurrency(currentTotalBalance, activeButton === '해외장')}</th>
                                <th className="th"></th>
                                <th className="th">{Math.round(totalDesiredWeight)}</th>
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
