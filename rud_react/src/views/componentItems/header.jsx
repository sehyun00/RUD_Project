import React, { useState } from "react";
import { Container } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import '../../assets/css/componentItems/header.scss';
import happyCatVideo from '../../assets/images/happycat.mp4';

const Header = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'; // 로그인 페이지 여부 확인

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="header">
            <Container className="header-container">
                <div className="header-left">
                    <video autoPlay loop muted className="logo-video">
                        <source src={happyCatVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Link to="/home">
                        <h3>Superant</h3>
                    </Link>
                </div>
                {!isLoginPage && (
                    <div className="header-right">
                        <div className="menu-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <h5>메뉴1</h5>
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/submenu1">서브메뉴1</Link>
                                    <Link to="/submenu2">서브메뉴2</Link>
                                </div>
                            )}
                        </div>
                        <h5>메뉴2</h5>
                        <h5>메뉴3</h5>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Header;
