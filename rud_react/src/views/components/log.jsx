import React from "react";
import PropTypes from 'prop-types';

// scss
import "../../assets/css/components/log.scss"

// page
const Log = () => {


    return (
        <div className="converter-container"> {/* 스타일 적용된 컨테이너 */}
            <div className="files-container"> {/* 파일 컨테이너 */}
            <h1>응애</h1>
            <h1>응애</h1>
            <h1>응애</h1>
            <h1>응애</h1>

            </div>
        </div>
    );
};

Log.propTypes = {
    classes: PropTypes.object
};

export default Log;
