import React, {useState} from "react";
import {Container} from 'reactstrap';
import {useLocation, Link} from 'react-router-dom';
import '../../assets/css/componentItems/header.scss';
import happyCatVideo from '../../assets/images/happycat.mp4';

const Header = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="header">
            <Container className="header-container">
                <div className="header-left">
                    <video autoPlay="autoPlay" loop="loop" muted="muted" className="logo-video">
                        <source src={happyCatVideo} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <Link to="/home">
                        <h3>Superant</h3>
                    </Link>
                </div>
                {
                    !isLoginPage && (
                        <div className="header-right">
                            <Link to="/log">
                                <div className='button'>
                                    <h5>내 기록</h5>
                                </div>
                            </Link>
                            <Link to="/login">
                                <div className="button">
                                    <h5>로그인</h5>
                                </div>
                            </Link>
                        </div>
                    )
                }
            </Container>
        </div>
    );
};

export default Header;
