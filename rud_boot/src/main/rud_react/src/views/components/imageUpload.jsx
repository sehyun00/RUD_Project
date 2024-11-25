import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import axios from 'axios';
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
        const [cashFile, stockFile] = files;

        if (!cashFile) {
            alert("현금 이미지를 업로드 해주세요.");
            return;
        }

        if (!stockFile) {
            alert("종목 이미지를 업로드 해주세요.");
            return;
        }

        const cashFormData = new FormData();
        cashFormData.append('file', cashFile);

        const stockFormData = new FormData();
        stockFormData.append('file', stockFile);

        try {
            const cashResponse = await axios.post(
                'https://6b2d-61-34-253-238.ngrok-free.app/wallet',
                cashFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            const stockResponse = await axios.post(
                'https://6b2d-61-34-253-238.ngrok-free.app/upload',
                stockFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('Cash Upload Success:', cashResponse.data);
            console.log('Stock Upload Success:', stockResponse.data);
            onSave({ cash: cashResponse.data, stock: stockResponse.data }); // 업로드된 데이터 전달
            console.log(cashResponse.data, stockResponse.data)
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
                        <div className={`image-box-1 ${draggingIndex === 0 ? 'drag-over' : ''}`} 
                            onDrop={handleDrop(0)} 
                            onDragOver={handleDragOver(0)} 
                            onDragLeave={handleDragLeave}>
                            {files[0] && (
                                <img src={URL.createObjectURL(files[0])} alt="미리보기" className="image-1" />
                            )}
                            {!files[0] && (
                                <div>
                                    <span>현금 이미지 올려</span>
                                </div>
                            )}
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
                        {fileNames[0] && <div className="file-name">{fileNames[0]}</div>}
                    </div>

                    {/* 두 번째 이미지 박스 */}
                    <div className="image-box-wrapper-2">
                        <div className={`image-box-2 ${draggingIndex === 1 ? 'drag-over' : ''}`} 
                        onDrop={handleDrop(1)} 
                            onDragOver={handleDragOver(1)} 
                            onDragLeave={handleDragLeave}>
                            {files[1] && (
                                <img src={URL.createObjectURL(files[1])} alt="미리보기" className="image-2" />
                            )}
                            {!files[1] && (
                                <div>
                                    <span>종목 이미지 올려</span>
                                </div>
                            )}
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
                        {fileNames[1] && <div className="file-name">{fileNames[1]}</div>}
                    </div>
                </div>
                <div className="confirm-button-container">
                    <Button className="confirm-button" onClick={handleSaveClick}>저장</Button>
                </div>
            </div>
        </div>
    );
};

ImageUpload.propTypes = {
    onSave: PropTypes.func.isRequired
};

export default ImageUpload;
