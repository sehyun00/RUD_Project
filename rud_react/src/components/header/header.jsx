import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Container, NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';

import logo from '../../assets/images/logos/Qr2I2KV5H3f3BuOfHNoHLvTFkj9HWlAOCVAXdVoWtPLKvRNTtzh0sLmegSyNNfLP1RRqo4xq_hYwf5JjQjwp3Q.mp4';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="topbar" id="top">
            <div className="header6">
                <Container className="po-relative">
                    <Navbar className="navbar-expand-lg h6-nav-bar">
                        <NavbarBrand href="/">
                            <video src={logo} style={{ width: '250px', height: '250px' }} muted autoPlay loop />
                        </NavbarBrand>
                        <NavbarToggler onClick={toggle}>
                            <span className="ti-menu"></span>
                        </NavbarToggler>
                        <Collapse
                            isOpen={isOpen}
                            navbar
                            className="hover-dropdown font-14 justify-content-end"
                            id="h6-info"
                        >
                            <div className="act-buttons">
                                <Link
                                    to="https://cs.sunmoon.ac.kr/cs/index.do"
                                    className="btn btn-success-gradiant font-16"
                                >
                                    선.문.컴.공
                                </Link>
                            </div>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    );
};

export default Header;
