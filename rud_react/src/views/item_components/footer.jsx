/* eslint-disable */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <div className="footer4 b-t spacer">
            <Container>
                <Row>
                    <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Address</h5>
                        <p>충청남도 아산시 탕정면 선문로221번길 70 선문대학교 원화관 505</p>
                    </Col>
                    <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Phone</h5>
                        <p>
                            sw 중심대학 : 041-530-8311
                            <br />
                        </p>
                    </Col>
                    <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Email</h5>
                        <p>
                            Office : <a className="link">k355323@gmail.com</a>{' '}
                        </p>
                    </Col>
                    <Col lg="3" md="6">
                        <h5 className="m-b-20">Social</h5>
                        <div className="round-social light">
                            <a className="link">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a className="link">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a className="link">
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a className="link">
                                <i className="fa fa-youtube-play"></i>
                            </a>
                            <a className="link">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
                <div className="f4-bottom-bar">
                    <Row>
                        <Col md="12">
                            <div className="d-flex font-14 justify-content-between">
                                <div className="m-t-10 m-b-10 copyright">All Rights Reserved by WrapPixel.</div>
                                <div className="links ms-auto m-t-10 m-b-10">
                                    <a className="p-10 p-l-0">Terms of Use</a>
                                    <a className="p-10">Legal Disclaimer</a>
                                    <a className="p-10">Privacy Policy</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};
export default Footer;
