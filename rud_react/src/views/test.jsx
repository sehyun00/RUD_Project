import React, {useState} from "react";
import PropTypes from 'prop-types';

// scss
import '../assets/css/test.scss';

// components
import TestEN from "./testEN";
import TestKR from "./testKR";

// page
const Test = () => {

    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
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
                        </div>
                    </div>
                </div>
                <div className="table-header-container">
                    <div className="table-header-wrapper">
                        <table className="table-header">
                            <thead>
                                <tr>
                                    <th rowSpan="2" className="text-center">종목명</th>
                                    <th rowSpan="2" className="text-center">주가</th>
                                    <th colSpan="3" className="text-center2">현재</th>
                                    <th rowSpan="2" className="text-center">희망비중</th>
                                    <th colSpan="3" className="text-center2">리밸런싱</th>
                                    <th rowSpan="2" className="text-center">수량조절</th>
                                </tr>
                                <tr>
                                    <th>수량</th>
                                    <th>잔고 ($)</th>
                                    <th>비중 (%)</th>
                                    <th>비중 (%)</th>
                                    <th>희망투자금 ($)</th>
                                    <th>희망수량</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className="table-body-container">
                    <div className="table-body-wrapper">

                    </div>
                </div>
            </div>
            <TestEN/>
            <TestKR/>
        </div>
    );
};

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;
