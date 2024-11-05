import React, {useState} from "react";
import PropTypes from 'prop-types'
import '../assets/css/test.scss';

// components
import TestEN from "./testEN";
import TestKR from "./testKR";

// page
const Test = () => {

    const [activeButton, setActiveButton] = useState("국내");
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
                <div className="table-container">
                    <div className="table-wrapper">
                        {
                            activeButton === '국내'
                                ? <TestKR/>
                                : <TestEN/>
                        }
                    </div>
                </div>
                <TestEN/>
            </div>

        </div>
    );
};

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;
