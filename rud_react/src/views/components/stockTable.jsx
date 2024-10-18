// features
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table } from "reactstrap";

// scss
import "../../assets/css/components/stockTable.scss";

// 더미 데이터 정의
const initialData = [
    { id: 1, name: "AAPL", price: 150.00, quantity: 10, targetRatio: 100 },
    { id: 2, name: "GOOGL", price: 2800.00, quantity: 5, targetRatio: 80 },
    { id: 3, name: "TSLA", price: 700.00, quantity: 20, targetRatio: 90 },
    { id: 4, name: "AMZN", price: 3400.00, quantity: 15, targetRatio: 70 },
    { id: 5, name: "MSFT", price: 290.00, quantity: 12, targetRatio: 60 },
];

// 각 종목의 데이터 행을 표시하는 컴포넌트
const DataRow = ({ item, totalAssets, totalTargetRatio, onQuantityChange, onTargetRatioChange }) => {
    const balance = item.price * item.quantity;
    const ratio = ((balance / totalAssets) * 100).toFixed(2);
    const rebalancingRatio = totalTargetRatio > 0 ? ((item.targetRatio / totalTargetRatio) * 100).toFixed(2) : 0;
    const targetInvestment = (rebalancingRatio / 100) * totalAssets;
    const targetQuantity = targetInvestment > 0 ? targetInvestment / item.price : 0;
    const quantityAdjustment = targetQuantity - item.quantity;

    return (
        <tr key={item.id}>
            <td className="text-center">{item.name}</td>
            <td className="text-center">{item.price}</td>
            <td className="input-cell">
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, parseFloat(e.target.value) || 0)}
                    className="input-style"
                />
            </td>
            <td className="text-center">{balance.toFixed(2)}</td>
            <td className="text-center">{ratio} %</td>
            <td className="input-cell">
                <input
                    type="number"
                    value={item.targetRatio}
                    onChange={(e) => onTargetRatioChange(item.id, parseFloat(e.target.value) || 0)}
                    className="input-style"
                />
            </td>
            <td className="text-center">{rebalancingRatio} %</td>
            <td className="text-center">{targetInvestment.toFixed(2)}</td>
            <td className="text-center">{targetQuantity.toFixed(2)}</td>
            <td className="text-center">{quantityAdjustment.toFixed(2)}</td>
        </tr>
    );
};

const StockTable = () => {
    const [data, setData] = useState(initialData);

    const handleQuantityChange = (id, newQuantity) => {
        setData((prevData) => prevData.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleTargetRatioChange = (id, newRatio) => {
        setData((prevData) => prevData.map((item) => item.id === id ? { ...item, targetRatio: newRatio } : item));
    };

    const totalAssets = data.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalTargetRatio = data.reduce((total, item) => total + item.targetRatio, 0);

    return (
        <div className="table-container">
            <Table className="custom-table">
                <thead>
                    <tr>
                        <th rowSpan="2" className="text-center">종목명</th>
                        <th rowSpan="2" className="text-center">주가</th>
                        <th colSpan="3" className="text-center">현재</th>
                        <th rowSpan="2" className="text-center">희망비중</th>
                        <th colSpan="3" className="text-center">리밸런싱</th>
                        <th rowSpan="2" className="text-center">수량조절</th>
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
    );
};

StockTable.propTypes = {
  classes: PropTypes.object
};

export default StockTable;
