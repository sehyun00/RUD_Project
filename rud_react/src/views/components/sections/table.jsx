import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';

// 더미 데이터 정의
const dummyData = [
  { id: 1, name: 'SCHD', price: 23.56, quantity: 10, balance: 235.60, ratio: '100%' },
  { id: 2, name: 'CONY', price: 45.34, quantity: 5, balance: 226.70, ratio: '80%' },
  { id: 3, name: '삼성전자', price: 12.99, quantity: 20, balance: 259.80, ratio: '90%' },
  { id: 4, name: 'TSLY', price: 34.50, quantity: 15, balance: 517.50, ratio: '70%' },
  { id: 5, name: 'CURE', price: 15.00, quantity: 12, balance: 180.00, ratio: '60%' },
];

const PageTable = () => {
    return (
        <div>
            <div className="spacer" id="table-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Table</h1>
                            <h6 className="subtitle"></h6>
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
                                    {dummyData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.ratio}</td>
                                        </tr>
                                    ))}
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
