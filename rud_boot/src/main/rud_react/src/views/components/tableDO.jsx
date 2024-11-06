import React from "react";
import PropTypes from 'prop-types';
import { Table } from "reactstrap";
import '../../assets/css/stockTable.scss';

const TableDO = ({ data, totalBalance, handleChange }) => {
    // 잔고 계산
    const calculateCurrentTotalBalance = () => {
        const domesticTotal = data.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        return domesticTotal + totalBalance; // totalBalance는 해외장 잔고 * 환율
    };

    const currentTotalBalance = calculateCurrentTotalBalance();

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
                                    ? `${((currentBalance / currentTotalBalance) * 100).toFixed(2)}%`
                                    : '0.00%'
                            }</td>
                            <td>{/* 희망비중 */}</td>
                            <td>{/* 리밸런싱 비중 */}</td>
                            <td>{/* 희망투자금 */}</td>
                            <td>{/* 희망수량 */}</td>
                        </tr>
                    );
                })}
            </tbody>
            <thead>
                <tr>
                    <th className="th"></th>
                    <th className="th">총합</th>
                    <th className="th"></th>
                    <th className="th">{currentTotalBalance}</th>
                    {/* 현재 잔고 총합 표시 */}
                    <th className="th">{/* 현재 비중 총합 */}</th>
                    <th className="th">{/* 희망 비중 총합 */}</th>
                    <th className="th">{/* 리밸런싱 비중 총합 */}</th>
                    <th className="th">{/*  */}</th>
                    <th className="th">{/*  */}</th>
                    <th className="th">{/*  */}</th>
                </tr>
            </thead>
        </Table>
    );
};

TableDO.propTypes = {
    data: PropTypes.array.isRequired, // data prop 정의
    totalBalance: PropTypes.number.isRequired, // totalBalance prop 정의
    handleChange: PropTypes.func.isRequired, // handleChange prop 정의
};

export default TableDO;
