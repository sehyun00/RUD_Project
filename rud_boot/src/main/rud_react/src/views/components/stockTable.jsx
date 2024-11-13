import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../assets/css/stockTable.scss';

// components
import TableDO from "./tableDO"; // 국내 컴포넌트
import TableFO from "./tableFO"; // 해외 컴포넌트

// StockTable 컴포넌트 정의
const StockTable = ({Reload, SD}) => {
    const [activeButton, setActiveButton] = useState("국장");
    const [exchangeRate, setExchangeRate] = useState(1200);
    const [loading, setLoading] = useState(true);
    
    // console.log('stock 국장:', SD?.국장);
    // console.log('stock 해외장:', SD?.해외장);

    const [stockData, setStockData] = useState({
        "국장": [
            {
                id: 1,
                name: "드래곤플라이",
                price: 1200,
                quantity: 1
            }, {
                id: 2,
                name: "디알텍",
                price: 950,
                quantity: 1
            }, {
                id: 3,
                name: "삼보산업",
                price: 800,
                quantity: 1
            }, {
                id: 4,
                name: "상보",
                price: 1100,
                quantity: 1
            }, {
                id: 5,
                name: "셀루메드",
                price: 1500,
                quantity: 1
            }, {
                id: 6,
                name: "소니드",
                price: 2000,
                quantity: 1
            }, {
                id: 7,
                name: "아이비전웍스",
                price: 1030,
                quantity: 1
            }, {
                id: 8,
                name: "압타머사이언스",
                price: 1700,
                quantity: 1
            }, {
                id: 9,
                name: "인스코비",
                price: 900,
                quantity: 1
            }, {
                id: 10,
                name: "한일단조",
                price: 850,
                quantity: 1
            }, {
                id: 11,
                name: "KIB플러그에너지",
                price: 1600,
                quantity: 1
            }, {
                id: 12,
                name: "SH에너지화학",
                price: 750,
                quantity: 1
            }
        ],
        "해외장": [
        ]
    });

    const [desiredWeights, setDesiredWeights] = useState({
        "국장": Array(stockData["국장"].length).fill(0),
        "해외장": Array(stockData["해외장"].length).fill(0)
    });

    const [currentData, setCurrentData] = useState(stockData["국장"]);

    useEffect(() => {
        const fetchStockPrices = async () => {
            try {
                const domesticStocks = SD?.국장 || [];
                const foreignStocks = SD?.해외장 || [];
    
                // 국장 데이터에서 종목 이름과 수량을 추출
                const domesticData = domesticStocks.reduce((acc, curr, index) => {
                    if (index % 2 === 0) { // 짝수 인덱스에서 종목명
                        const quantity = domesticStocks[index + 1] || 1; // 다음 인덱스에서 수량 가져오기
                        acc.push({ id: acc.length + 1, name: curr, quantity: parseInt(quantity), price: 0 });
                    }
                    return acc;
                }, []);
    
                // 해외장 데이터에서 종목 이름과 수량을 추출
                const foreignData = foreignStocks.reduce((acc, curr, index) => {
                    if (index % 2 === 0) { // 짝수 인덱스에서 종목명
                        const quantity = foreignStocks[index + 1] || 1; // 다음 인덱스에서 수량 가져오기
                        acc.push({ id: acc.length + domesticData.length + 1, name: curr, quantity: parseInt(quantity), price: 0 });
                    }
                    return acc;
                }, []);
    
                // 가격을 가져올 종목 리스트 생성
                const allStocks = [...domesticData, ...foreignData];
    
                // 종가를 순차적으로 가져오기
                for (const stock of allStocks) {
                    stock.price = await fetchStockPrice(stock.name);
                    // console.log(`${stock.name}: ${stock.price}`); // 종목명과 가격 로그
                    await new Promise(resolve => setTimeout(resolve, 1000)); 
                }
    
                setStockData({
                    "국장": domesticData,
                    "해외장": foreignData
                });
    
            } catch (error) {
                console.error("종가를 가져오는 데 오류가 발생했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchStockPrices();
    }, [SD]);
    
    
    const fetchStockPrice = async (stockName, marketType) => {
        console.log(stockName, marketType); // 요청 전 로그
        try {
            const endpoint = marketType === '국장' ? 
                `http://localhost:5001/getkos?name=${stockName}` : 
                `http://localhost:5001/getnas?name=${stockName}`;
            
            const response = await axios.get(endpoint);
    
            // 응답 데이터 로그
            console.log(response.data); // 응답 데이터 확인
    
            // 종가를 반환하는 부분 수정
            if (response.data) {
                return response.data; // 문자열 그대로 반환
            }
    
            return null; // 데이터가 없을 경우 null 반환
        } catch (error) {
            console.error("종가를 가져오는 데 오류가 발생했습니다.", error);
            return null;
        }
    };
    
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
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
            minimumFractionDigits: isForeign ? 2 : 0,
            maximumFractionDigits: isForeign ? 2 : 0
        };
        const formattedAmount = new Intl.NumberFormat('ko-KR', options).format(amount);
        return isForeign ? `$ ${formattedAmount}` : `₩ ${formattedAmount}`;
    
    };

    const calculateCurrentTotalBalance = () => {
        const domesticTotal = stockData["국장"].reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const foreignTotal = stockData["해외장"].reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return activeButton === "국장" ? domesticTotal + (foreignTotal * exchangeRate) : (domesticTotal / exchangeRate) + foreignTotal;
    };

    const handleReloadClick = () => {
        if (window.confirm("재업로드 하시겠습니까? 기존에 입력한 내용은 사라집니다.")) {
            Reload();
        }
    };

    const handleChange = (index, field, value) => {
        const newData = [...currentData];
        newData[index][field] = value;
        setCurrentData(newData);
    };

    const handleButtonClick = (clickButton) => {
        setActiveButton(clickButton);
        setCurrentData(stockData[clickButton]);
    };

    const handleWeightChange = (index, value) => {
        const newWeights = { ...desiredWeights };
        newWeights[activeButton][index] = value;
        setDesiredWeights(newWeights);
    };

    const totalDesiredWeight = desiredWeights["국장"].reduce((total, weight) => total + (parseFloat(weight) || 0), 0) +
                              desiredWeights["해외장"].reduce((total, weight) => total + (parseFloat(weight) || 0), 0);


    const currentTotalBalance = calculateCurrentTotalBalance(); 



    if (loading) {
        return <div>환율을 로딩 중...</div>;
    }

    return (
        <div className="stock-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="table-switch-wrapper">
                        <div className="table-switch">
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
                                        />
                                : <TableFO
                                        data={currentData}
                                        totalBalance={calculateCurrentTotalBalance()}
                                        handleChange={handleChange}
                                        desiredWeights={desiredWeights["해외장"]}
                                        handleWeightChange={handleWeightChange}
                                        currentTotalBalance={currentTotalBalance}
                                        totalDesiredWeight={totalDesiredWeight} 
                                        />
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
                                </tr>
                            </thead>
                        </table>
                    </div>
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
