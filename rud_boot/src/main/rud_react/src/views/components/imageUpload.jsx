import React, {useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import axios from 'axios';
import Modal from 'react-modal';

import '../../assets/css/components/imageUpload.scss';

import questionmarkImage from '../../assets/images/questionmark.png';
import gofullpagetestImage from '../../assets/images/gofullpagetest.png';
import cash_blurImage from '../../assets/images/cash_blur.png';
import stocks_blurImage from '../../assets/images/stocks_blur.png';

import LoadingPage from '../componentItems/loading'; 
import ImageUploadModal from '../componentItems/imageUploadModal'

Modal.setAppElement('#root');

const ImageUpload = ({onSave, setLoading, setProgress, loading, progress, isModalOpen, toggleModal}) => {
    const [files, setFiles] = useState([null, null]);
    const [fileNames, setFileNames] = useState(["", ""]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const fileInputRefs = [useRef(null), useRef(null)];

    const handleFileInputChange = (index) => (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files];
        const newFileNames = [...fileNames];

        newFiles[index] = selectedFiles[0];
        newFileNames[index] = selectedFiles[0]
            ? selectedFiles[0].name
            : "";

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

        newFiles[index] = selectedFiles[0];
        newFileNames[index] = selectedFiles[0]
            ? selectedFiles[0].name
            : "";

        setFiles(newFiles);
        setFileNames(newFileNames);
        setDraggingIndex(null);
    };

    const handleDragOver = (index) => (event) => {
        event.preventDefault();
        setDraggingIndex(index);
    };

    const handleDragLeave = () => {
        setDraggingIndex(null);
    };

    const handleSaveClick = async () => {
        const [cashFile, stockFile] = files;

        if (!cashFile) {
            alert('현금 이미지를 업로드 해주세요.');
            return;
        }

        if (!stockFile) {
            alert('종목 이미지를 업로드 해주세요.');
            return;
        }

        setLoading("imageupload");
        setProgress(0);

        const cashFormData = new FormData();
        cashFormData.append('file', cashFile); // cashFile이 올바르게 설정되어 있는지 확인

        const stockFormData = new FormData();
        stockFormData.append('file', stockFile); // stockFile이 올바르게 설정되어 있는지 확인

        try {
            const cashResponse = await axios.post(
                'https://931d-61-34-253-238.ngrok-free.app/wallet',
                cashFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: () => {
                        const percentCompleted = 0;
                        setProgress(percentCompleted);
                    }
                }
            );

            const stockResponse = await axios.post(
                'https://931d-61-34-253-238.ngrok-free.app/upload',
                stockFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: () => {
                        const percentCompleted = 50;
                        setProgress(percentCompleted); // 진행도 업데이트
                    }
                }
            );
            setProgress(100);
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Cash Upload Success:', cashResponse.data);
            console.log('Stock Upload Success:', stockResponse.data);
            onSave({cash: cashResponse.data, stock: stockResponse.data});
        } catch (error) {
            console.error('Upload Error:', error);
            alert("파일 업로드 실패: " + (
                error.response
                    ? error.response.data.error
                    : "서버 오류"
            ));
        } finally {
            setLoading("0");
            setProgress(0);
        }
    };

    return (
        <div className="image-upload-container">
            <LoadingPage loading={loading} progress={progress}/>
            <div className="contents-container">
                <div className="switch-container">
                    <div className="switch-1-wrapper">
                        <div className="switch-1">
                            <div>
                                <span>이미지 업로드</span>
                            </div>
                            <img
                                className="questionmark"
                                src={questionmarkImage}
                                onClick={toggleModal}
                                alt="질문 마크"/>
                        </div>
                    </div>
                </div>
                <div className="image-box-container">
                    {/* 첫 번째 이미지 박스 */}
                    <div className="image-box-wrapper-1">
                        <div
                            className={`image-box-1 ${draggingIndex === 0
                                ? 'drag-over'
                                : ''}`}
                            onDrop={handleDrop(0)}
                            onDragOver={handleDragOver(0)}
                            onDragLeave={handleDragLeave}>
                            {
                                files[0] && (
                                    <img src={URL.createObjectURL(files[0])} alt="미리보기" className="image-1"/>
                                )
                            }
                            {
                                !files[0] && (
                                    <div>
                                        <span>자산 캡쳐화면을 업로드해주세요.</span>
                                    </div>
                                )
                            }
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
                            style={{
                                display: 'none'
                            }}
                            accept="image/*"/> {fileNames[0] && <div className="file-name">{fileNames[0]}</div>}
                    </div>

                    {/* 두 번째 이미지 박스 */}
                    <div className="image-box-wrapper-2">
                        <div
                            className={`image-box-2 ${draggingIndex === 1
                                ? 'drag-over'
                                : ''}`}
                            onDrop={handleDrop(1)}
                            onDragOver={handleDragOver(1)}
                            onDragLeave={handleDragLeave}>
                            {
                                files[1] && (
                                    <img src={URL.createObjectURL(files[1])} alt="미리보기" className="image-2"/>
                                )
                            }
                            {
                                !files[1] && (
                                    <div>
                                        <span>종목 캡쳐화면을 업로드해주세요.</span>
                                    </div>
                                )
                            }
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
                            style={{
                                display: 'none'
                            }}
                            accept="image/*"/> {fileNames[1] && <div className="file-name">{fileNames[1]}</div>}
                    </div>
                </div>
                <div className="confirm-button-container">
                    <Button className="confirm-button" onClick={handleSaveClick}>
                        저장
                    </Button>
                </div>
            </div>
        </div>
    );
};

ImageUpload.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default ImageUpload;
