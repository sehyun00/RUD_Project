import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../assets/css/home.scss';
import Modal from 'react-modal'; // 모달 라이브러리 추가

// components
import StockTable from "./components/stockTable";
import ImageUpload from "./components/imageUpload";

// modal 스타일 설정
Modal.setAppElement('#root');

const Home = () => {
    const [isImageUploadVisible, setImageUploadVisible] = useState(true);
    const [stockData, setStockData] = useState(null);
    const [isModalOpen, setModalOpen] = useState(true); // 모달 상태 추가

    const handleSave = (data) => {
        setStockData(data);
        setImageUploadVisible(false);
        setModalOpen(false); // 이미지 업로드 후 모달 닫기
    };

    const handleReloadImageUpload = () => {
        setStockData(null);
        setImageUploadVisible(true);
        setModalOpen(true); // 이미지 업로드로 돌아갈 때 모달 열기
    };

    const closeModal = () => {
        setModalOpen(false); // 모달 닫기
    };

    return (
        <div className="home-container">
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="안내 메시지"
                className="upload-info"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick={false}
            >
                <h2>도움말</h2>
                <p>토스증권, 현금, 종목, 이미지 예시</p>
                <button className="info-button" onClick={closeModal}>확인</button>
            </Modal>

            {
                isImageUploadVisible
                    ? (<ImageUpload onSave={handleSave} />)
                    : (<StockTable Reload={handleReloadImageUpload} SD={stockData} />)
            }
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
