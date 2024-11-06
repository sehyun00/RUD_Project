import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../../assets/css/stockTable.scss';

// components
import TestEN from "./testEN";
import TestKR from "./testKR";

// page
const StockTable = ({ Reload }) => {
    const [activeButton, setActiveButton] = useState("국내");
    
    const stockData = {
        "국장": [
            { id: 1, name: "드래곤플라이", price: 120.50, quantity: 1 },
            { id: 2, name: "디알텍", price: 95.00, quantity: 1 },
            { id: 3, name: "삼보산업", price: 80.75, quantity: 1 },
            { id: 4, name: "상보", price: 110.25, quantity: 1 },
            { id: 5, name: "셀루메드", price: 150.00, quantity: 1 },
            { id: 6, name: "소니드", price: 200.00, quantity: 1 },
            { id: 7, name: "아이비전웍스", price: 130.00, quantity: 1 },
            { id: 8, name: "압타머사이언스", price: 170.50, quantity: 1 },
            { id: 9, name: "인스코비", price: 90.00, quantity: 1 },
            { id: 10, name: "한일단조", price: 85.00, quantity: 1 },
            { id: 11, name: "KIB플러그에너지", price: 160.00, quantity: 1 },
            { id: 12, name: "SH에너지화학", price: 75.00, quantity: 1 }
        ],
        "해외장": [
            { id: 1, name: "CONY", price: 180.00, quantity: 180 },
            { id: 2, name: "CURE", price: 250.00, quantity: 1 },
            { id: 3, name: "SCHD", price: 300.00, quantity: 6 }
        ]
    };

    const handleButtonClick = (clickButton) => {
        setActiveButton(clickButton);
    };

    const handleReloadClick = () => {
        if (window.confirm("재업로드 하시겠습니까? 기존에 입력한 내용은 사라집니다.")) {
            Reload();
        }
    };

    // 잔고 계산 함수
    const calculateBalances = (data) => {
        return data.map(item => ({
            ...item,
            balance: item.price * item.quantity // 잔고 = 주가 * 수량
        }));
    };

    const domesticData = calculateBalances(stockData.국장);
    const foreignData = calculateBalances(stockData.해외장);

    return (
        <div className="test-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="table-switch-wrapper">
                        <div className="table-switch">
                            <div
                                className={`table-choice ${activeButton === '국내' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('국내')}>
                                <span>국내</span>
                            </div>
                            <div
                                className={`table-choice ${activeButton === '해외' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('해외')}>
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
                            activeButton === '국내'
                                ? <TestKR data={domesticData} />
                                : <TestEN data={foreignData} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

StockTable.propTypes = {
    Reload: PropTypes.func.isRequired, // Reload 핸들러 prop 정의
};

export default StockTable;
