// home.jsx
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import '../assets/css/home.scss';
import { useNavigate } from 'react-router-dom';

// components
import StockTable from "./components/stockTable";
import ImageUpload from "./components/imageUpload";
import ImageUploadModal from "./componentItems/imageUploadModal";

const Home = ({ userID, loginState }) => {
    const [isImageUploadVisible, setImageUploadVisible] = useState(() => {
        const savedVisible = localStorage.getItem('isImageUploadVisible');
        return savedVisible === 'true'; 
    });
    
    const [stockData, setStockData] = useState(() => {
        const savedData = localStorage.getItem('stockData');
        return savedData ? JSON.parse(savedData) : null;
    });
    
    const [isModalOpen, setModalOpen] = useState(() => {
        const savedOpen = localStorage.getItem('isModalOpen');
        return savedOpen === 'true'; // 로컬 스토리지에서 boolean 값으로 변환
    });
    
    const [loading, setLoading] = useState("0");
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    
    console.log(userID);

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

    const toggleModal = () => {
        setModalOpen(!isModalOpen); // 모달 열기/닫기 토글
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                closeModal(); // 엔터 키를 눌렀을 때 모달 닫기
            }
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]); // 모달이 열릴 때만 이벤트 리스너 추가

    // 상태가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('isImageUploadVisible', isImageUploadVisible);
    }, [isImageUploadVisible]);

    useEffect(() => {
        localStorage.setItem('stockData', JSON.stringify(stockData));
        if (stockData === null) {
            localStorage.removeItem('stockData'); // 데이터가 없으면 로컬 스토리지에서 제거
        }
    }, [stockData]);

    useEffect(() => {
        localStorage.setItem('isModalOpen', isModalOpen);
    }, [isModalOpen]);
    
    if (loginState === true) {
        return (
            <div className="home-container">
                <ImageUploadModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
                {
                isImageUploadVisible ? (
                    <ImageUpload 
                    onSave={handleSave} 
                    setLoading={setLoading} 
                    setProgress={setProgress} 
                    loading = {loading}
                    progress ={progress}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    />
                ) : (
                    <StockTable 
                    Reload={handleReloadImageUpload} 
                    SD={stockData} 
                    setLoading={setLoading} 
                    setProgress={setProgress}
                    loading = {loading}
                    progress ={progress}
                    />
                )
    
                }
            </div>
        );
    } else {
        navigate('/login'); 
        return null;
    };
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
