import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table } from "reactstrap";
import '../../assets/css/stockTable.scss';

const TableKR = ({ data }) => {
    // 초기 데이터 상태 설정
    const [stockData, setStockData] = useState(data);

    const handleChange = (index, field, value) => {
        const newStockData = [...stockData];
        newStockData[index][field] = value;
        setStockData(newStockData);
    };

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
                {stockData.map((item, index) => (
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
                        <td>{/* 현재 잔고 */}</td>
                        <td>{/* 현재 비중 */}</td>
                        <td>{/* 희망비중 */}</td>
                        <td>{/* 리밸런싱 비중 */}</td>
                        <td>{/* 희망투자금 */}</td>
                        <td>{/* 희망수량 */}</td>
                        <td>{/* 수량 조절 */}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

TableKR.propTypes = {
    data: PropTypes.array.isRequired, // data prop 정의
    classes: PropTypes.object
};

export default TableKR;
