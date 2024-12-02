import React, {useState} from "react";
import {Container} from 'reactstrap';
import {useLocation, Link, useNavigate } from 'react-router-dom';
import '../../assets/css/componentItems/header.scss';
import superAnt from '../../assets/images/ant_head.png';

const Header = ({logoutHandler, loginState, setIsDarkMode, isDarkMode}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    const logoutsibal = () => {
        logoutHandler(); // 로그아웃 상태 업데이트
        navigate('/login'); // 로그인 페이지로 이동
    }

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="header">
            <Container className="header-container">
                <div className="header-left">
                    <img src={superAnt} className="logo" />
                    {loginState === true ? (
                    <Link to="/home">
                        <h3>Superant</h3>
                    </Link>
                    ) : (
                    <Link to="/login">
                        <h3>Superant</h3>
                    </Link>
                    )}
                    <button onClick={toggleTheme}>
                        {isDarkMode ? '라이트 모드' : '다크 모드'}
                    </button>
                </div>
                {
                    !isLoginPage && (
                        <div className="header-right">
                            <Link to="/log">
                                <div className='button'>
                                    <h5>내 기록</h5>
                                </div>
                            </Link>
                            <div className="button" onClick={logoutsibal}>
                                <h5>로그아웃</h5>
                            </div>
                        </div>
                    )
                }
            </Container>
        </div>
    );
};

export default Header;
