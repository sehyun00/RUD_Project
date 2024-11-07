// feature
import React from "react";
import PropTypes from 'prop-types';

// scss
import '../../assets/css/components/uploadTEST.scss';

// page
const UploadTEST = () => {
    return (
        <div className="image-upload-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="switch-1-wrapper">
                        <div className="switch-1">
                            <div>
                                <span>이미지 업로드</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-box-container">
                    <div className="image-box-wrapper-1">
                        <div className="image-box-1">
                        </div>
                        <div className="upload-button-1">
                        </div>
                    </div>
                    <div className="image-box-wrapper-2">
                        <div className="image-box-2">
                        </div>
                        <div className="upload-button-2">
                        </div>
                    </div>
                </div>
                <div className="confirm-button-container">
                    <div className="comfirm-button">
                    </div>
                </div>
            </div>
        </div>
    );
};

UploadTEST.propTypes = {
    classes: PropTypes.object
};

export default UploadTEST;
