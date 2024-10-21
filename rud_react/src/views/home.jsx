import React, { useState } from "react";
import PropTypes from 'prop-types';

// scss
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

    return (
        <div className="converter-container"> {/* 스타일 적용된 컨테이너 */}
            <div className="files-container"> {/* 파일 컨테이너 */}
                {isImageUploadVisible ? (
                    <ImageUpload onSave={handleSave} /> // prop으로 핸들러 전달
                ) : (
                    <StockTable /> // ImageUpload가 숨겨지면 StockTable 표시
                )}
            </div>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
