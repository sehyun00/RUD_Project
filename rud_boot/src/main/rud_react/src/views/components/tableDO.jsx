import React, { useState } from "react"; // useState 추가
import PropTypes from 'prop-types';
import { Table } from "reactstrap";
import '../../assets/css/stockTable.scss';

const TableDO = ({ data, totalBalance, handleChange, desiredWeights, handleWeightChange }) => {
    
    return (
        <Table className="custom-table">
            <thead>
                <tr>
                    <th rowSpan="2" className="th">종목명</th>
                    <th rowSpan="2" className="th">주가</th>
                    <th colSpan="3">현재</th>
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
                {data.map((item, index) => {
                    const currentBalance = item.price * item.quantity; // 현재 잔고
                    return (
                        <tr key={item.id}>
                            <td>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                />
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <input
                                    className="number"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                />
                            </td>
                            <td>{currentBalance}</td>
                            <td>{
                                totalBalance > 0
                                    ? `${((currentBalance / (data.reduce((total, currentItem) => total + (currentItem.price * currentItem.quantity), 0) + totalBalance)) * 100).toFixed(2)}%`
                                    : '0.00%'
                            }</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={desiredWeights[index]}
                                    onChange={(e) => handleWeightChange(index, e.target.value)}
                                />
                            </td>
                            <td>{/* 리밸런싱 비중 */}</td>
                            <td>{/* 희망투자금 */}</td>
                            <td>{/* 희망수량 */}</td>
                            <td>{/* 조절할 수량 */}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

TableDO.propTypes = {
    data: PropTypes.array.isRequired, // data prop 정의
    totalBalance: PropTypes.number.isRequired, // totalBalance prop 정의
    handleChange: PropTypes.func.isRequired, // handleChange prop 정의
};

export default TableDO;
