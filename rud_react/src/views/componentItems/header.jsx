<<<<<<< HEAD
import React, {useState} from "react";
import {Container} from 'reactstrap';
import {useLocation, Link} from 'react-router-dom';
=======
import React from "react";
import { Container } from 'reactstrap';
<<<<<<< HEAD
import { useLocation } from 'react-router-dom';
=======
import { useLocation, Link } from 'react-router-dom';
>>>>>>> 560fc468d239ac9da74978501b964146485ae17c
>>>>>>> origin/back)Member_DB
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
<<<<<<< HEAD
                    <h3>Superant</h3>
=======
                    <Link to="/home">
                        <h3>Superant</h3>
                    </Link>
>>>>>>> 560fc468d239ac9da74978501b964146485ae17c
                </div>
                {
                    !isLoginPage && (
                        <div className="header-right">
                            <div className="button">
                                <h5>메뉴1</h5>
                            </div>
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
