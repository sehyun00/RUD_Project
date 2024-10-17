/* eslint-disable */
import React from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';

import img1 from '../../../assets/images/portfolio/app1.png';
import img2 from '../../../assets/images/portfolio/app2.png';
import img3 from '../../../assets/images/portfolio/app3.png';
import img4 from '../../../assets/images/portfolio/app4.png';
// 376 814
const PortfolioComponent = () => {
    return (
        <div>
            <div className="spacer">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title">선문철 앱 내 기능</h1>
                            {/* <h6 className="subtitle">
                                You can relay on our amazing features list and also our customer services will be great
                                experience for you without doubt and in no-time
                            </h6> */}
                        </Col>
                    </Row>
                    <Row className="m-t-40">
                        <Col md="6">
                            <Card className="card-shadow">
                                <a className="img-ho">
                                    <img className="card-img-top" src={img1} alt="wrappixel kit" />
                                </a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">영상 제보, 회원 점수제</h5>
                                    <p className="m-b-0 font-14"></p> <br />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="card-shadow">
                                <a className="img-ho">
                                    <img className="card-img-top" src={img2} alt="wrappixel kit" />
                                </a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">급가속, 급감속, 과속, 제보 등으로 점수 할당</h5>
                                    <p className="m-b-0 font-14"></p>
                                    <br />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md="6">
                            <Card className="card-shadow">
                                <a className="img-ho">
                                    <img className="card-img-top" src={img3} alt="wrappixel kit" />
                                </a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">신고 성공 내역 확인</h5>
                                    <p className="m-b-0 font-14"></p> <br />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="card-shadow">
                                <a className="img-ho">
                                    <img className="card-img-top" src={img4} alt="wrappixel kit" />
                                </a>
                                <CardBody>
                                    <h5 className="font-medium m-b-0">자신이 신고당한 내역 확인</h5>
                                    <p className="m-b-0 font-14"></p> <br />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default PortfolioComponent;
