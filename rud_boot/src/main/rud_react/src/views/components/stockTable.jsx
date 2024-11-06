import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../assets/css/stockTable.scss';

// components
import TableDO from "./tableDO"; // 국내 컴포넌트
import TableFO from "./tableFO"; // 해외 컴포넌트

// page
const StockTable = ({ Reload }) => {
    const [activeButton, setActiveButton] = useState("국장");
    const [exchangeRate, setExchangeRate] = useState(1200); // 기본 환율
    const [loading, setLoading] = useState(true);

    const [stockData, setStockData] = useState({
        "국장": [
            { id: 1, name: "드래곤플라이", price: 120, quantity: 1 },
            { id: 2, name: "디알텍", price: 95, quantity: 1 },
            { id: 3, name: "삼보산업", price: 80, quantity: 1 },
            { id: 4, name: "상보", price: 110, quantity: 1 },
            { id: 5, name: "셀루메드", price: 150, quantity: 1 },
            { id: 6, name: "소니드", price: 200, quantity: 1 },
            { id: 7, name: "아이비전웍스", price: 130, quantity: 1 },
            { id: 8, name: "압타머사이언스", price: 170, quantity: 1 },
            { id: 9, name: "인스코비", price: 90, quantity: 1 },
            { id: 10, name: "한일단조", price: 85, quantity: 1 },
            { id: 11, name: "KIB플러그에너지", price: 160, quantity: 1 },
            { id: 12, name: "SH에너지화학", price: 75, quantity: 1 }
        ],
        "해외장": [
            { id: 1, name: "CONY", price: 180.00, quantity: 180 },
            { id: 2, name: "CURE", price: 250.00, quantity: 1 },
            { id: 3, name: "SCHD", price: 300.00, quantity: 6 }
        ]
    });

    const [desiredWeights, setDesiredWeights] = useState({
        "국장": Array(stockData["국장"].length).fill(0),
        "해외장": Array(stockData["해외장"].length).fill(0),
    });

    const [currentData, setCurrentData] = useState(stockData["국장"]);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                const rate = response.data.rates.KRW;
                setExchangeRate(rate);
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

    const handleButtonClick = (clickButton) => {
        setActiveButton(clickButton);
        setCurrentData(stockData[clickButton]);
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

    const handleWeightChange = (index, value) => {
        const newWeights = { ...desiredWeights };
        newWeights[activeButton][index] = value;
        setDesiredWeights(newWeights);
    };

    const calculateCurrentTotalBalance = () => {
        const domesticTotal = stockData["국장"].reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const foreignTotal = stockData["해외장"].reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (activeButton === "국장") {
            return domesticTotal + (foreignTotal * exchangeRate);
        } else {
            return (domesticTotal / exchangeRate) + foreignTotal;
        }
    };

    const currentTotalBalance = calculateCurrentTotalBalance();

    if (loading) {
        return <div>환율을 로딩 중...</div>;
    }

    const formatCurrency = (amount, isForeign) => {
        const options = {
            style: 'decimal',
            minimumFractionDigits: isForeign ? 2 : 0,
            maximumFractionDigits: isForeign ? 2 : 0
        };

        const formatter = new Intl.NumberFormat('ko-KR', options);
        return isForeign ? `$${formatter.format(amount)}` : `₩${formatter.format(amount)}`;
    };

    return (
        <div className="stock-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="table-switch-wrapper">
                        <div className="table-switch">
                            <div
                                className={`table-choice ${activeButton === '국장' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('국장')}>
                                <span>국내</span>
                            </div>
                            <div
                                className={`table-choice ${activeButton === '해외장' ? 'active' : ''}`}
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
                                    totalBalance={currentTotalBalance} 
                                    handleChange={handleChange} 
                                    desiredWeights={desiredWeights["국장"]} 
                                    handleWeightChange={handleWeightChange} 
                                  />
                                : <TableFO 
                                    data={currentData} 
                                    totalBalance={currentTotalBalance} 
                                    handleChange={handleChange} 
                                    desiredWeights={desiredWeights["해외장"]} 
                                    handleWeightChange={handleWeightChange} 
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
                                    <th className="th">{/* 희망 비중 총합 */}</th>
                                    <th className="th">{/* 리밸런싱 비중 총합 */}</th>
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

StockTable.propTypes = {
    Reload: PropTypes.func.isRequired,
};

export default StockTable;
