// table.jsx

import React, { useState } from "react";
import "../../../assets/css/css.css";
import { Container, Row, Col, Table } from "reactstrap";

// 더미 데이터 정의
const initialData = [
  { id: 1, name: "SCHD", price: 23.56, quantity: 10, targetRatio: 100 },
  { id: 2, name: "CONY", price: 45.34, quantity: 5, targetRatio: 80 },
  { id: 3, name: "삼성전자", price: 12.99, quantity: 20, targetRatio: 90 },
  { id: 4, name: "TSLY", price: 34.5, quantity: 15, targetRatio: 70 },
  { id: 5, name: "CURE", price: 15.0, quantity: 12, targetRatio: 60 },
];

// 각 종목의 데이터 행을 표시하는 컴포넌트
const DataRow = ({
  item,
  totalAssets,
  totalTargetRatio,
  onQuantityChange,
  onTargetRatioChange,
}) => {
  const balance = item.price * item.quantity;
  const ratio = ((balance / totalAssets) * 100).toFixed(2);
  const rebalancingRatio =
    totalTargetRatio > 0
      ? ((item.targetRatio / totalTargetRatio) * 100).toFixed(2)
      : 0;
  const targetInvestment = (rebalancingRatio / 100) * totalAssets;
  const targetQuantity =
    targetInvestment > 0 ? targetInvestment / item.price : 0;
  const quantityAdjustment = targetQuantity - item.quantity;

  return (
    <tr key={item.id}>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {item.name}
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {item.price}
      </td>
      <td style={{ width: "9%" }}>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) =>
            onQuantityChange(item.id, parseFloat(e.target.value) || 0)
          }
          className="input-style" // 변경된 부분
        />
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {balance.toFixed(2)}
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {ratio} %
      </td>
      <td style={{ width: "9%" }}>
        <input
          type="number"
          value={item.targetRatio}
          onChange={(e) =>
            onTargetRatioChange(item.id, parseFloat(e.target.value) || 0)
          }
          className="input-style" // 변경된 부분
        />
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {rebalancingRatio} %
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {targetInvestment.toFixed(2)}
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {targetQuantity.toFixed(2)}
      </td>
      <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        {quantityAdjustment.toFixed(2)}
      </td>
    </tr>
  );
};

const PageTable = () => {
  const [data, setData] = useState(initialData);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setData(updatedData);
  };

  const handleTargetRatioChange = (id, newRatio) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, targetRatio: newRatio } : item
    );
    setData(updatedData);
  };

  const totalAssets = data.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalTargetRatio = data.reduce(
    (total, item) => total + item.targetRatio,
    0
  );

  return (
    <div>
      <div className="spacer" id="table-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center"></Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <div className="table-responsive">
              <Table className="custom-table">
                <thead>
                  <tr>
                    <th
                      rowSpan="2"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      종목명
                    </th>
                    <th
                      rowSpan="2"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      주가
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      현재
                    </th>
                    <th
                      rowSpan="2"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      희망비중
                    </th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      리밸런싱
                    </th>
                    <th
                      rowSpan="2"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      수량조절
                    </th>
                  </tr>
                  <tr>
                    <th>수량</th>
                    <th>잔고</th>
                    <th>비중 (%)</th>
                    <th>비중 (%)</th>
                    <th>희망투자금</th>
                    <th>희망수량</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <DataRow
                      key={item.id}
                      item={item}
                      totalAssets={totalAssets}
                      totalTargetRatio={totalTargetRatio}
                      onQuantityChange={handleQuantityChange}
                      onTargetRatioChange={handleTargetRatioChange}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageTable;
