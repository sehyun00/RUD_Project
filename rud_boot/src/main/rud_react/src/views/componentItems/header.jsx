// app/header

import React, {useState} from "react";
import {Container} from 'reactstrap';
import {useLocation, Link, useNavigate } from 'react-router-dom';

//scss
import '../../assets/css/componentItems/header.scss';

//image
import superAnt from '../../assets/images/ant_head.png';
import modeChangeButtonW from "../../assets/images/mode_changeW.png";
import modeChangeButtonB from "../../assets/images/mode_changeB.png";

const Header = ({logoutHandler, loginState, isDarkMode, toggleTheme}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    const logoutbutton = () => {
        logoutHandler(); // 로그아웃 상태 업데이트
        navigate('/login'); // 로그인 페이지로 이동
    }

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
                </div>
                {
                    !isLoginPage && (
                        <div className="header-right">
                            <div className="mode-change-button">
                            {isDarkMode ? (
                                <img src={modeChangeButtonB} className="mode-change-button" onClick={toggleTheme}/>
                            ):(
                                <img src={modeChangeButtonW} className="mode-change-button" onClick={toggleTheme}/>
                            )}
                            </div>
                            <Link to={location.pathname === '/home' ? '/log' : '/home'}>
                                <div className='button'>
                                    <h5>{location.pathname === '/home' ? '내 기록' : '홈'}</h5>
                                </div>
                            </Link>
                            <div className="button" onClick={logoutbutton}>
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
