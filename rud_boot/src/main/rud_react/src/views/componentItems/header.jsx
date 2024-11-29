import React, {useState} from "react";
import {Container} from 'reactstrap';
import {useLocation, Link, useNavigate } from 'react-router-dom';
import '../../assets/css/componentItems/header.scss';
import happyCatVideo from '../../assets/images/happycat.mp4';

const Header = ({logoutHandler, loginState}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    const logoutsibal = () => {
        logoutHandler(); // 로그아웃 상태 업데이트
        navigate('/login'); // 로그인 페이지로 이동
    }

    return (
        <div className="header">
            <Container className="header-container">
                <div className="header-left">
                    <video autoPlay="autoPlay" loop="loop" muted="muted" className="logo-video">
                        <source src={happyCatVideo} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    {loginState === true ? (
                    <Link to="/home">
                        <h3>Superant</h3>
                    </Link>
                    ) : (
                    <Link to="/login">
                        <h3>Superant</h3>
                    </Link>
                    )}
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
