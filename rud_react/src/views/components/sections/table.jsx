import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';

const PageTable = () => {
    return (
        <div>
            <div className="spacer" id="table-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Table</h1>
                            <h6 className="subtitle">Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website &amp; dashboard in No-time.</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>종목명</th>
                                        <th>주가</th>
                                        <th>수량</th>
                                        <th>현재 잔고</th>
                                        <th>비중</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Deshmukh</td>
                                        <td>Prohaska</td>
                                        <td>@Genelia</td>
                                        <td><span className="label label-danger">admin</span> </td>
                                    </tr>
                                    <tr>
                                        <td>SCHD</td>
                                        <td>23.56</td>
                                        <td>23</td>
                                        <td>541.88</td>
                                        <td>100%</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PageTable;
