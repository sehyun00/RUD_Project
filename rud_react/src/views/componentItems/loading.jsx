// Loading.js
import React, {useState} from 'react';

import loadinghomerGif from '../../assets/images/loadinghomer.gif'; // GIF 파일 임포트

import '../../assets/css/componentItems/loading.scss'; 

const LoadingPage = ({loading, progress, stockNumber, allStocksNumber }) => {

    const pageSelect = () => {
        if (loading === 'imageupload') {
            return (
                <>
                    {progress >= 50 ? (
                        <div className="loading-message">종목 정보를 전달하고 있어요... (2/2)</div>
                    ) : (
                        <div className="loading-message">현금 정보를 전달하고 있어요... (1/2)</div>
                    )}
                </>
            );
        } else {
            return (
                <div className="loading-message">{loading} 주가를 불러오는 중이예요({stockNumber}/{allStocksNumber})...</div>
            );
        }
    };

    if(loading === '0') {
    }else {
        return (
            <div className="loading-overlay">
                    {pageSelect()}
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div
                            className="progress"
                            style={{
                                width: `${progress}%`
                            }}></div>
                    </div>
                    <img src={loadinghomerGif} alt="로딩 중" className="loading-gif" style={{
                        left: `${progress}%`,
                        transform: 'translateX(-50%)'
                    }} />
                </div>
            </div>
        );
    }
};

export default LoadingPage;
