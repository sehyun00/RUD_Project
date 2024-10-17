/* eslint-disable */
import React from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';

import img1 from '../../../assets/images/features/feature13/img1.jpg';
import img2 from '../../../assets/images/features/feature13/img2.jpg';
import img3 from '../../../assets/images/features/feature13/img3.jpg';
import img4 from '../../../assets/images/features/feature13/img4.jpg';
import img5 from '../../../assets/images/features/feature30/img1.jpg';
import car1 from '../../../assets/images/features/feature30/car1.jpg';
import car2 from '../../../assets/images/features/feature30/car2.png';
import car3 from '../../../assets/images/features/feature30/car3.png';
import car4 from '../../../assets/images/features/feature30/car4.png';
import car5 from '../../../assets/images/features/feature30/car5.png';
import car6 from '../../../assets/images/features/feature30/car6.jpg';
import num1 from '../../../assets/images/features/feature30/num1.jpg';
import num2 from '../../../assets/images/features/feature30/num3.png';

const FeatureComponent = () => {
    return (
        <div>
            <div className="spacer bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">차선위반 AI가 차선위반 차량을 잡는 과정</h1>
                            <h6 className="subtitle"></h6>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer1 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={car1} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">1단계</span>
                                        <h2 className="title">프레임 단위로 영상을 자릅니다</h2>
                                        {/* <p>
                                            AI 모델이 이미지를 분석할 수 있도록 mp4 파일을 <br />
                                            프레임 단위로 잘라 이미지 파일로 만듭니다
                                        </p> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer2 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={car2} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">2단계</span>
                                        <h2 className="title">
                                            차량 검출 모델(vehicle_model)을 사용하여 차량을 검출합니다
                                        </h2>
                                        {/* <p>
                                            AI 모델이 차량과 차선을 인식할 수 있도록 이미지의 전처리 과정을 거치고
                                            차량의 객체를 잡습니다
                                        </p> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer3 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={car3} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">3단계</span>
                                        <h2 className="title">
                                            차선 검출 모델(lane_model) 을 사용하여 차선을 검출합니다
                                        </h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer4 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={car4} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">4단계</span>
                                        <h2 className="title">
                                            위험 감지 모델(violation_model)을 사용하여 위반 차량을 검출합니다
                                        </h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer5 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={car5} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">5단계</span>
                                        <h2 className="title">
                                            위험 정도를 매겨줍니다
                                            <br />
                                            (normal, danger, violation)
                                        </h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer6 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={car6} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">6단계</span>
                                        <h2 className="title">위반된 차량을 확대합니다</h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="spacer bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">차량 번호판 인식 과정</h1>
                            <h6 className="subtitle"></h6>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="plate1 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={num1} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">1단계</span>
                                        <h2 className="title">
                                            위반된 차량의 <br />
                                            번호판을 인식합니다
                                        </h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="plate2 ">
                <Container className="feature30">
                    <Row>
                        <Col lg="10">
                            <img src={num2} className="rounded img-responsive" alt="wrappixel" />
                        </Col>
                        <Col lg="5" md="7" className="text-center wrap-feature30-box">
                            <Card className="card-shadow">
                                <CardBody>
                                    <div className="p-20">
                                        <span className="label label-info label-rounded">2단계</span>
                                        <h2 className="title">
                                            번호판 객체에서 <br />
                                            텍스트를 추출합니다
                                        </h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default FeatureComponent;
