import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Table} from "reactstrap";
import '../../assets/css/stockTable.scss';

// 더미 데이터 정의 - 국내
const initialDomesticData = [
    {
        id: 1,
        name: "KODEX",
        price: 150.00,
        quantity: 10,
        targetRatio: 100
    }, {
        id: 2,
        name: "TIGER",
        price: 2800.00,
        quantity: 5,
        targetRatio: 80
    }, {
        id: 3,
        name: "PLUS",
        price: 700.00,
        quantity: 20,
        targetRatio: 90
    }, {
        id: 4,
        name: "KOSEF",
        price: 3400.00,
        quantity: 15,
        targetRatio: 70
    }, {
        id: 5,
        name: "RISE",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 6,
        name: "TREX",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 7,
        name: "TREX",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 8,
        name: "TREX",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 9,
        name: "TREX",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 10,
        name: "TREX",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 11,
        name: "TREX",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }, {
        id: 12,
        name: "김세현",
        price: 290.00,
        quantity: 12,
        targetRatio: 60
    }
];

// 각 종목의 데이터 행을 표시하는 컴포넌트
const DataRow = (
    {item, totalAssets, totalTargetRatio, onQuantityChange, onTargetRatioChange}
) => {
    const balance = item.price * item.quantity;
    const ratio = ((balance / totalAssets) * 100).toFixed(2);
    const rebalancingRatio = totalTargetRatio > 0
        ? ((item.targetRatio / totalTargetRatio) * 100).toFixed(2)
        : 0;
    const targetInvestment = (rebalancingRatio / 100) * totalAssets;
    const targetQuantity = targetInvestment > 0
        ? targetInvestment / item.price
        : 0;
    const quantityAdjustment = targetQuantity - item.quantity;

    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, parseFloat(e.target.value) || 0)}
                    />
            </td>
            <td>{balance.toFixed(2)}</td>
            <td>{ratio}
                %</td>
            <td>
                <input
                    type="number"
                    value={item.targetRatio}
                    onChange={(e) => onTargetRatioChange(item.id, parseFloat(e.target.value) || 0)}
                    />
            </td>
            <td>{rebalancingRatio}
                %</td>
            <td>{targetInvestment.toFixed(2)}</td>
            <td>{targetQuantity.toFixed(2)}</td>
            <td>{quantityAdjustment.toFixed(2)}</td>
        </tr>
    );
};

const TableKR = () => {
    const [domesticData, setDomesticData] = useState(initialDomesticData); // 국내 데이터만 사용

    const handleQuantityChange = (id, newQuantity) => {
        setDomesticData((prevData) => prevData.map(
            (item) => item.id === id
                ? {
                    ...item,
                    quantity: newQuantity
                }
                : item
        ));
    };

    const handleTargetRatioChange = (id, newRatio) => {
        setDomesticData((prevData) => prevData.map(
            (item) => item.id === id
                ? {
                    ...item,
                    targetRatio: newRatio
                }
                : item
        ));
    };

    const totalAssets = domesticData.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const totalTargetRatio = domesticData.reduce(
        (total, item) => total + item.targetRatio,
        0
    );

    return (
        <Table className="custom-table">
            <thead>
                <tr>
                    <th rowSpan="2" className="th">종목명</th>
                    <th rowSpan="2" className="th">주가</th>
                    <th colSpan="3" >현재</th>
                    <th rowSpan="2" className="th">희망비중</th>
                    <th colSpan="3">리밸런싱</th>
                    <th rowSpan="2" className="th">수량조절</th>
                </tr>
                <tr>
                    <th className="th">수량</th>
                    <th className="th">잔고 (₩)</th>
                    <th className="th">비중 (%)</th>
                    <th className="th">비중 (%)</th>
                    <th className="th">희망투자금 (₩)</th>
                    <th className="th">희망수량</th>
                </tr>
            </thead>
            <tbody>
                {
                    domesticData.map((item) => (
                        <DataRow
                            key={item.id}
                            item={item}
                            totalAssets={totalAssets}
                            totalTargetRatio={totalTargetRatio}
                            onQuantityChange={handleQuantityChange}
                            onTargetRatioChange={handleTargetRatioChange}/>
                    ))
                }
            </tbody>
        </Table>
    );
};

TableKR.propTypes = {
    classes: PropTypes.object
};

export default TableKR;
