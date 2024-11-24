import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import axios from 'axios';
import Modal from 'react-modal'; // 모달 라이브러리 추가
import '../../assets/css/components/imageUpload.scss';

import questionmarkImage from '../../assets/images/questionmark.png';
import gofullpagetestImage from '../../assets/images/gofullpagetest.png';
import cash_blurImage from '../../assets/images/cash_blur.png';
import stocks_blurImage from '../../assets/images/stocks_blur.png';

Modal.setAppElement('#root');

const ImageUpload = ({ onSave }) => {
    const [files, setFiles] = useState([null, null]);
    const [fileNames, setFileNames] = useState(["", ""]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const fileInputRefs = [useRef(null), useRef(null)];

    const handleFileInputChange = (index) => (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files];
        const newFileNames = [...fileNames];

        newFiles[index] = selectedFiles[0];
        newFileNames[index] = selectedFiles[0] ? selectedFiles[0].name : "";

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
        newFileNames[index] = selectedFiles[0] ? selectedFiles[0].name : "";

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
                'https://6041-61-34-253-238.ngrok-free.app/wallet',
                cashFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            const stockResponse = await axios.post(
                'https://6041-61-34-253-238.ngrok-free.app/upload',
                stockFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('Cash Upload Success:', cashResponse.data);
            console.log('Stock Upload Success:', stockResponse.data);
            onSave({ cash: cashResponse.data, stock: stockResponse.data });
        } catch (error) {
            console.error('Upload Error:', error);
            alert("파일 업로드 실패: " + (
                error.response
                    ? error.response.data.error
                    : "서버 오류"
            ));
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    // 엔터 키로 모달 닫기
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && modalOpen) {
                toggleModal(); // 모달이 열려 있을 때만 닫기
            }
        };

        if (modalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalOpen]);

    return (
        <div className="image-upload-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="switch-1-wrapper">
                        <div className="switch-1">
                            <div>
                                <span>이미지 업로드</span>
                            </div>
                            <img className="questionmark" src={questionmarkImage} onClick={toggleModal} alt="질문 마크" />
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
                                    <span> 자산 캡쳐화면을 업로드해주세요.</span>
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
                                    <span>종목 캡쳐화면을 업로드해주세요.</span>
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

            {/* 모달 구현 */}
            <Modal
                className="upload-info"
                isOpen={modalOpen}
                onRequestClose={toggleModal}
                contentLabel="안내 메시지"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick={false}
                tabIndex="-1">
                <h2>도움말</h2>
                <p>
                    1. chrome 웹 스토어에서{' '}
                    <a
                        href="https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl?hl=ko&utm_source=ext_sidebar"
                        target="_blank"
                        rel="noopener noreferrer">
                        Gofullpage
                    </a>
                    확장 프로그램 설치
                </p>
                <br />
                <p>
                2. 원하는 페이지에서 우측 상단 확장프로그램 모음 → gofullpage 아이콘을 클릭 후 Download image (PNG)로 캡쳐
                </p><br />
                <img className="info-image-1" src={gofullpagetestImage} alt="도움말 이미지 1" />
                <br />
                <br />
                <p>
                3. 내 계좌 → 자산 페이지에서 우측 사이드 바 닫은 후 캡쳐.
                </p><br />
                <img className="info-image-2" src={cash_blurImage} alt="도움말 이미지 2" />
                <br />
                <br />
                <p>
                4. 우측 사이드 바 → 내 투자 페이지에서 사이드 바 닫은 후 캡쳐
                </p><br />
                <img className="info-image-3" src={stocks_blurImage} alt="도움말 이미지 3" />

                <button className="info-button" onClick={toggleModal}>확인</button>
            </Modal>
        </div>
    );
};

ImageUpload.propTypes = {
    onSave: PropTypes.func.isRequired
};

export default ImageUpload;

