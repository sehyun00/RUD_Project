// feature
import React, {useState, useRef} from "react";
import PropTypes from 'prop-types';
import {Container, Table, Button} from 'reactstrap';
import axios from 'axios';

// scss
import '../../assets/css/components/uploadTEST.scss';

const UploadTEST = ({onSave}) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleAddFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveClick = async () => {
        if (files.length === 0) {
            alert("업로드할 파일이 없습니다.");
            return;
        }

        const formData = new FormData();
        files.forEach(file => formData.append('file', file));

        try {
            const response = await axios.post(
                // 'https://fbbc-61-34-253-238.ngrok-free.app/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Upload Success:', response.data);
            onSave();
        } catch (error) {
            console.error('Upload Error:', error);
            alert("파일 업로드 실패: " + (
                error.response
                    ? error.response.data.error
                    : "서버 오류"
            ));
        }
    };

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
                    <div className="image-box-wrapper">
                        <div className="image-box">
                        </div>
                        <div className="upload-button">
                        </div>
                    </div>
                    <div className="image-box-wrapper">
                        <div className="image-box">
                        </div>
                        <div className="upload-button">
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
    onSave: PropTypes.func.isRequired
};

export default UploadTEST;