import React, {useState} from "react";
import PropTypes from 'prop-types';
import '../../assets/css/stockTable.scss';

// components
import TestEN from "./testEN";
import TestKR from "./testKR";

// page
const StockTable = ({Reload, stockData}) => {
    const [activeButton, setActiveButton] = useState("국내");

    const handleButtonClick = (clickButton) => {
        setActiveButton(clickButton);
    };

    const handleReloadClick = () => {
        if (window.confirm("재업로드 하시겠습니까? 기존에 입력한 내용은 사라집니다.")) {
            Reload();
        }
    };

    return (
        <div className="test-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="table-switch-wrapper">
                        <div className="table-switch">
                            <div
                                className={`table-choice ${activeButton === '국내'
                                    ? 'active'
                                    : ''}`}
                                onClick={() => handleButtonClick('국내')}>
                                <span>국내</span>
                            </div>
                            <div
                                className={`table-choice ${activeButton === '해외'
                                    ? 'active'
                                    : ''}`}
                                onClick={() => handleButtonClick('해외')}>
                                <span>해외</span>
                            </div>
                            <div className="image-reload" onClick={handleReloadClick}>
                                {/* 이미지 재업로드 핸들러 호출 */}
                                <span>이미지 재업로드</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <div className="table-wrapper">
                        {
                            activeButton === '국내'
                                ? <TestKR data={stockData
                                            ?.국장}/>
                                : <TestEN data={stockData
                                            ?.해외장}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

StockTable.propTypes = {
    Reload: PropTypes.func.isRequired, // Reload 핸들러 prop 정의
    classes: PropTypes.object
};

export default StockTable;
