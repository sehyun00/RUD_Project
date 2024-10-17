/* eslint-disable */
import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const BannerComponent = () => {
    return (
        <div>
            {/* <div className="spacer">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">선문철이 뭐죠?</h1>
                            <h6 className="subtitle">
                                선문철은 도로 위의 중앙선 침범, 실선 침범 <br />
                                차량들을 잡는 SW입니다
                            </h6>
                        </Col>
                    </Row>
                </Container>
            </div> */}
            <br /> <br /> <br />
            <div className="static-slider10" style={{ height: '100vh' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" className="align-self-center text-center">
                            <br />
                            {/* <span className="label label-rounded label-inverse">선문철</span> */}
                            <h1 className="title">선문철이 뭐죠?</h1>
                            <br />
                            <h4 className="subtitle op-8">
                                선문철은 도로 위의 중앙선 침범, 실선 침범 <br />
                                차량들을 잡는 AI(KOTR)을 탑재한 SW입니다 <br />
                            </h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default BannerComponent;
