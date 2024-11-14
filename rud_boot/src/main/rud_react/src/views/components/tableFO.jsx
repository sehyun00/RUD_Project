import React from "react"; 
import PropTypes from 'prop-types';
import { Table } from "reactstrap";
import '../../assets/css/stockTable.scss';

const TableFO = ({
    data,
    handleChange,
    desiredWeights,
    handleWeightChange,
    totalDesiredWeight,
    currentTotalBalance,
    addEmptyRow
}) => {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const adjustWeights = (index, value) => {
        const newDesiredWeights = [...desiredWeights];
        newDesiredWeights[index] = Math.min(100, Math.max(0, value)); 

        handleWeightChange(index, newDesiredWeights[index]);
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
                    <th className="th">잔고 ($)</th>
                    <th className="th">비중 (%)</th>
                    <th className="th">비중 (%)</th>
                    <th className="th">희망투자금 ($)</th>
                    <th className="th">희망수량</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => {
                        // console.log(index, item.name, item.quantity, item.price);
                        // 현재 잔고
                        const currentprice = item.price * item.quantity; 

                        // 현재 비중
                        const currentBalance = currentTotalBalance > 0 ? (currentprice / currentTotalBalance) * 100 : 0;

                        // 현재 종목의 희망 비중
                        const currentDesiredWeight = parseFloat(desiredWeights[index]) || 0; 

                        // 리밸런싱 비중 계산
                        const rebalanceWeight = totalDesiredWeight > 0
                            ? (currentDesiredWeight / totalDesiredWeight) * 100
                            : 0;

                        // 희망 투자금 계산
                        const desiredInvestment = currentTotalBalance * (rebalanceWeight/100);
                        
                        // 희망 수량 계산
                        const desiredQuantity = desiredInvestment / item.price;

                        // 조절 수량
                        const quantityControl = desiredQuantity - item.quantity;

                        // 조절 수량 스타일 결정
                        const quantityControlStyle = quantityControl > 0 ? 'text-plus' : 'text-minus'; // 양수는 빨간색, 음수는 파란색
                        const quantityControlValue = quantityControl > 0 ? `+${quantityControl.toFixed(2)}` : quantityControl.toFixed(2);

                        return (
                            <tr key={item.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}/>
                                </td>
                                <td className="money-expression">$ {formatCurrency(item.price)}</td>
                                <td>
                                    <input
                                        className="number"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}/>
                                </td>
                                <td> {formatCurrency(currentprice)}</td>
                                <td>{formatCurrency(currentBalance.toFixed(2))} %</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={desiredWeights[index]}
                                        onChange={(e) => adjustWeights(index, e.target.value)}/>
                                </td>
                                <td>{rebalanceWeight.toFixed(2)}%</td> {/* 리밸런싱 비중 표시 */}
                                <td> {formatCurrency(desiredInvestment)}</td> {/* 희망투자금 표시 */}
                                <td>{desiredQuantity.toFixed(2)}</td> {/* 희망수량 표시 */}
                                <td className={quantityControlStyle}>{quantityControlValue}</td> {/* 조절 수량 표시 */}
                            </tr>
                        );
                    })
                }
                <tr>
                    <td className="td10" onClick={addEmptyRow}><h2>종목 추가</h2></td>
                </tr>
            </tbody>
        </Table>
    );
};

TableFO.propTypes = {
    data: PropTypes.array.isRequired, // data prop 정의
    totalBalance: PropTypes.number.isRequired, // totalBalance prop 정의
    handleChange: PropTypes.func.isRequired, // handleChange prop 정의
    desiredWeights: PropTypes.array.isRequired, // 희망 비중 배열
    handleWeightChange: PropTypes.func.isRequired, // 희망 비중 변경 처리 함수
    totalDesiredWeight: PropTypes.number.isRequired, // totalDesiredWeight 추가
};

export default TableFO;
