import React from "react";
import { Container } from 'reactstrap';
<<<<<<< HEAD
import { useLocation } from 'react-router-dom';
=======
import { useLocation, Link } from 'react-router-dom';
>>>>>>> 560fc468d239ac9da74978501b964146485ae17c
import '../../assets/css/componentItems/header.scss';
import happyCatVideo from '../../assets/images/happycat.mp4';

const Header = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'; // 로그인 페이지 여부 확인

    return (
        <div className="header">
            <Container className="header-container">
                <div className="left">
                    <video autoPlay loop muted className="logo-video">
                        <source src={happyCatVideo} type="video/mp4" />
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
                {!isLoginPage && ( // 로그인 페이지가 아닐 때만 메뉴 표시
                    <div className="right">
                        <h5>메뉴1</h5>
                        <h5>메뉴2</h5>
                        <h5>메뉴3</h5>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Header;
