import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col } from 'reactstrap';

const HeaderBanner = () => {
    return (
        <div className="static-slider-head">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="6" className="align-self-center text-center">
                        <h1 className="title">선문철</h1>
                        <h4 className="subtitle font-light">
                            도로 안전성을 향상하고, 차량 위반을 <br />
                            감시하기 위한 차선 위반 감지 모델 입니다.
                        </h4>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeaderBanner;
