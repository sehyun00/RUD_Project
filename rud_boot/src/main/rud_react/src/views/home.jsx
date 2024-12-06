// app/home
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import '../assets/css/home.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// components
import StockTable from "./components/stockTable";
import ImageUpload from "./components/imageUpload";
import ImageUploadModal from "./componentItems/imageUploadModal";

Modal.setAppElement('#root');

const Home = ({ userID, loginState, currentTheme }) => {
    const [isImageUploadVisible, setImageUploadVisible] = useState(() => {
        const savedVisible = localStorage.getItem('isImageUploadVisible');
        return savedVisible === 'true'; // 초기값 설정
    });
    
    const [stockData, setStockData] = useState(() => {
        const savedData = localStorage.getItem('stockData');
        return savedData ? JSON.parse(savedData) : null;
    });
    
    const [isModalOpen, setModalOpen] = useState(() => {
        const savedOpen = localStorage.getItem('isModalOpen');
        return savedOpen === 'true'; // 초기값 설정
    });
    const [isLoginState, setLoginState] = useState(() => {
        const savedLogin = localStorage.getItem('isLoginState');
        return savedLogin ? savedLogin : null; // 초기값 설정
    })
    
    const [loading, setLoading] = useState("0");
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    
    const handleSave = (data) => {
        setStockData(data);
        setImageUploadVisible(false);
        setModalOpen(false); // 이미지 업로드 후 모달 닫기
    };

    const handleReloadImageUpload = () => {
        setImageUploadVisible(true);
        setModalOpen(true); // 이미지 업로드로 돌아갈 때 모달 열기
    };

    const closeModal = () => {
        setModalOpen(false); // 모달 닫기
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen); // 모달 열기/닫기 토글
    };

    const returnStockTable = () => {
        setImageUploadVisible(false);
    }
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
        localStorage.setItem('isLoginState', isLoginState);
    }, [isLoginState]);

    useEffect(() => {
        localStorage.setItem('stockData', JSON.stringify(stockData));
        if (stockData === null) {
            localStorage.removeItem('stockData'); // 데이터가 없으면 로컬 스토리지에서 제거
        }
    }, [stockData]);

    useEffect(() => {
        localStorage.setItem('isModalOpen', isModalOpen);
    }, [isModalOpen]);

    // useEffect(() => {
    //     if (isLoginState !== loginState) {
    //         setLoginState(null);
    //     } else {
    //         setLoginState(userID);
    //     }
    // },[loginState]);
    const userCheck = () => {
        setLoginState(userID);
    }
    
    if (loginState === true) {
        return (
            <div className="home-container">
                <ImageUploadModal isModalOpen={isModalOpen} toggleModal={toggleModal} currentTheme={currentTheme}/>
                {
                isImageUploadVisible ? (
                    <ImageUpload 
                    onSave={handleSave} 
                    setLoading={setLoading} 
                    setProgress={setProgress} 
                    loading={loading}
                    progress={progress}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    currentTheme={currentTheme}
                    returnStockTable={returnStockTable}
                    />
                ) : (
                    <StockTable 
                    Reload={handleReloadImageUpload} 
                    SD={stockData} 
                    setLoading={setLoading} 
                    setProgress={setProgress}
                    loading={loading}
                    progress={progress}
                    currentTheme={currentTheme}
                    searchstock={isImageUploadVisible}
                    loginState={isLoginState}
                    userCheck={userCheck}
                    userID={userID}
                    />
                )
                }
            </div>
        );
    } else {
        navigate('/login'); 
        return null;
    }
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
