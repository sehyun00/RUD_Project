// feature
import React, {useState, useRef} from "react";
import PropTypes from 'prop-types';
import {Container, Table, Button} from 'reactstrap';
import axios from 'axios';

// scss
import '../../assets/css/components/imageUpload.scss';

const ImageUpload = ({ onSave }) => {
    const [files, setFiles] = useState([null, null]); // 두 개의 파일 상태
    const [fileNames, setFileNames] = useState(["", ""]); // 파일 이름 상태
    const [draggingIndex, setDraggingIndex] = useState(null); // 드래그 중인 인덱스
    const fileInputRefs = [useRef(null), useRef(null)]; // 두 개의 ref

    const handleFileInputChange = (index) => (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files];
        const newFileNames = [...fileNames];

        newFiles[index] = selectedFiles[0]; // 해당 인덱스에 파일 저장
        newFileNames[index] = selectedFiles[0] ? selectedFiles[0].name : ""; // 파일명 저장

        setFiles(newFiles);
        setFileNames(newFileNames);
    };

    const handleAddFileClick = (index) => {
        fileInputRefs[index].current?.click();
    };

    const handleDrop = (index) => (event) => {
        event.preventDefault();
        const selectedFiles = Array.from(event.dataTransfer.files);
        const newFiles = [...files];
        const newFileNames = [...fileNames];

        newFiles[index] = selectedFiles[0]; // 드롭한 파일 저장
        newFileNames[index] = selectedFiles[0] ? selectedFiles[0].name : ""; // 파일명 저장

        setFiles(newFiles);
        setFileNames(newFileNames);
        setDraggingIndex(null); // 드래그 종료
    };

    const handleDragOver = (index) => (event) => {
        event.preventDefault(); // 기본 동작 방지
        setDraggingIndex(index); // 드래그 중인 인덱스 설정
    };

    const handleDragLeave = () => {
        setDraggingIndex(null); // 드래그가 박스를 떠날 때 인덱스 초기화
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        files.forEach(file => {
            if (file) {
                formData.append('file', file);
            }
        });

        if (files.every(file => file === null)) {
            alert("업로드할 파일이 없습니다.");
            return;
        }

        try {
            const response = await axios.post(
                'https://fbbc-61-34-253-238.ngrok-free.app/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Upload Success:', response.data);
            onSave(response.data); // 업로드된 데이터를 onSave에 전달
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
                    {/* 첫 번째 이미지 박스 */}
                    <div className="image-box-wrapper-1">
                        <div 
                            className={`image-box-1 ${draggingIndex === 0 ? 'drag-over' : ''}`}
                            onDrop={handleDrop(0)}
                            onDragOver={handleDragOver(0)}
                            onDragLeave={handleDragLeave}
                        >
                            {files[0] && (
                                <img src={URL.createObjectURL(files[0])} alt="미리보기" className="image-1" />
                            )}
                            <div>
                                <span>현금 이미지 올려</span>
                            </div>
                        </div>
                        <div className="upload-button-1" onClick={() => handleAddFileClick(0)}>
                            <div>
                                <span>파일 선택</span>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRefs[0]}
                            onChange={handleFileInputChange(0)}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        {fileNames[0] && <div className="file-name">{fileNames[0]}</div>} {/* 파일명 표시 */}
                    </div>

                    {/* 두 번째 이미지 박스 */}
                    <div className="image-box-wrapper-2">
                        <div 
                            className={`image-box-2 ${draggingIndex === 1 ? 'drag-over' : ''}`}
                            onDrop={handleDrop(1)}
                            onDragOver={handleDragOver(1)}
                            onDragLeave={handleDragLeave}
                        >
                            {files[1] && (
                                <img src={URL.createObjectURL(files[1])} alt="미리보기" className="image-2" />
                            )}
                            <div>
                                <span>종목 이미지 올려</span>
                            </div>
                        </div>
                        <div className="upload-button-2" onClick={() => handleAddFileClick(1)}>
                            <div>
                                <span>파일 선택</span>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRefs[1]}
                            onChange={handleFileInputChange(1)}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        {fileNames[1] && <div className="file-name">{fileNames[1]}</div>} {/* 파일명 표시 */}
                    </div>
                </div>
                <div className="confirm-button-container">
                    <Button className="comfirm-button" onClick={handleSaveClick}>저장</Button>
                    <Button className="filecheck-button" onClick={handleSaveClick}>검사</Button>
                </div>
            </div>
        </div>
    );
};

ImageUpload.propTypes = {
    onSave: PropTypes.func.isRequired
};

export default ImageUpload;
