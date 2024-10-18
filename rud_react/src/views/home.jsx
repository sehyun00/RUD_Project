// features
import React, { useState } from "react";
import PropTypes from 'prop-types';

// scss
import '../assets/css/home.scss';

// components
import StockTable from "./components/stockTable";
import ImageUpload from "./components/imageUpload";

// page
const Home = () => {
    const [isImageUploadVisible, setImageUploadVisible] = useState(true); // 상태 추가

    // 저장하기 버튼 클릭 핸들러
    const handleSave = () => {
        setImageUploadVisible(false); // ImageUpload 숨기기
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>홈 페이지</h1>
            {isImageUploadVisible ? (
                <ImageUpload onSave={handleSave} /> // prop으로 핸들러 전달
            ) : (
                <StockTable /> // ImageUpload가 숨겨지면 StockTable 표시
            )}
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
