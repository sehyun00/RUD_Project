import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../assets/css/home.scss';

// components
import StockTable from "./components/stockTable";
import ImageUpload from "./components/imageUpload";

// page
const Home = () => {
    const [isImageUploadVisible, setImageUploadVisible] = useState(true); // 초기값을 true로 설정

    // 저장하기 버튼 클릭 핸들러
    const handleSave = () => {
        setImageUploadVisible(false); // ImageUpload 숨기기
    };

    // 이미지 재업로드 핸들러
    const handleReloadImageUpload = () => {
        setImageUploadVisible(true); // ImageUpload 보이기
    };

    return (
        <div className="converter-container">
            <div className="files-container">
                {
                    isImageUploadVisible
                        ? (<ImageUpload onSave={handleSave} />) // prop으로 핸들러 전달
                        : (<StockTable Reload={handleReloadImageUpload} />) // ImageUpload가 숨겨지면 StockTable 표시
                }
            </div>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
