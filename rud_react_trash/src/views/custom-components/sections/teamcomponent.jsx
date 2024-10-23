/* eslint-disable */
import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const TeamComponent = () => {
    return (
        <div>
            <div className="spacer bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">The Team 선문철</h1>
                            {/* <h6 className="subtitle">
                                Here you can check Demos we created based on WrapKit. Its quite easy to Create your own
                                dream website &amp; dashboard in No-time.
                            </h6> */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="spacer team2">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            {/* <h2 className="title">The Team 선문철</h2> */}
                            {/* <h6 className="subtitle">
                                You can relay on our amazing features list and also our customer services will be great
                                experience for you without doubt and in no-time
                            </h6> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3" md="6" className="m-b-30">
                            <Row className="no-gutters m-2">
                                <Col md="12" className="pro-pic t1"></Col>
                                <Col md="12">
                                    <div className="p-t-10">
                                        <h5 className="title font-medium">한효민</h5>
                                        <h6 className="subtitle">팀장</h6>
                                        <p>개발 총괄, AI개발</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="3" md="6" className="m-b-30">
                            <Row className="no-gutters m-2">
                                <Col md="12" className="col-md-12 pro-pic t2"></Col>
                                <Col md="12">
                                    <div className="p-t-10">
                                        <h5 className="title font-medium">김승호</h5>
                                        <h6 className="subtitle">팀원</h6>
                                        <p>백엔드, AI 개발</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="3" md="6" className="m-b-30">
                            <Row className="no-gutters m-2">
                                <Col md="12" className="col-md-12 pro-pic t3"></Col>
                                <Col md="12">
                                    <div className="p-t-10">
                                        <h5 className="title font-medium">김민주</h5>
                                        <h6 className="subtitle">팀원</h6>
                                        <p>앱 프론트엔드</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="3" md="6" className="m-b-30">
                            <Row className="no-gutters m-2">
                                <Col md="12" className="col-md-12 pro-pic t4"></Col>
                                <Col md="12">
                                    <div className="p-t-10">
                                        <h5 className="title font-medium">송인호</h5>
                                        <h6 className="subtitle">팀원</h6>
                                        <p>웹 개발</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default TeamComponent;
