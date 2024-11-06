import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../assets/css/home.scss';

// components
import StockTable from "./components/stockTable";
import ImageUpload from "./components/imageUpload";

// page
const Home = () => {
    const [isImageUploadVisible, setImageUploadVisible] = useState(false);
    const [stockData, setStockData] = useState(null); // 주식 데이터를 저장할 상태 추가

    const handleSave = (data) => {
        setStockData(data); // 주식 데이터 저장
        setImageUploadVisible(false); // ImageUpload 숨기기
    };

    const handleReloadImageUpload = () => {
        setImageUploadVisible(true); // ImageUpload 보이기
    };

    return (
        <div className="converter-container">
            <div className="files-container">
                {
                    isImageUploadVisible
                        ? (<ImageUpload onSave={handleSave} />) // prop으로 핸들러 전달
                        : (<StockTable Reload={handleReloadImageUpload} stockData={stockData} />) // ImageUpload가 숨겨지면 StockTable 표시
                }
            </div>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
