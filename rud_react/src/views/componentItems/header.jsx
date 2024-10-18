// feature
import React from "react";
import { Container } from 'reactstrap';
import { useLocation } from 'react-router-dom'; // useLocation 훅 추가

// scss
import '../../assets/css/componentItems/header.scss';

// image
import happyCatVideo from '../../assets/images/happycat.mp4'; // 비디오 파일 경로

// component
const Header = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'; // 로그인 페이지 여부 확인

    return (
        <div className={`header ${isLoginPage ? 'inverted' : ''}`}> {/* 로그인 페이지일 때 클래스 추가 */}
            <Container className="header-container">
                <div className="left">
                    <video autoPlay loop muted className="logo-video">
                        <source src={happyCatVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h3>Superant</h3>
                </div>
                {
                    !isLoginPage && ( // 로그인 페이지가 아닐 때만 메뉴 표시
                        <div className="right">
                            <h5>메뉴1</h5>
                            <h5>메뉴2</h5>
                            <h5>메뉴3</h5>
                        </div>
                    )
                }
            </Container>
        </div>
    );
};

export default Header;
