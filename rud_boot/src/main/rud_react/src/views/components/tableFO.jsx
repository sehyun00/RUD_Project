//app/home/stockTable/tableFo

import React, {useEffect, useState, useRef} from "react";
import PropTypes from 'prop-types';
import {Alert, Table} from "reactstrap";
import '../../assets/css/stockTable.scss';

const TableDO = ({
    data,
    handleChange,
    desiredWeights,
    handleWeightChange,
    totalDesiredWeight,
    currentTotalBalance,
    addEmptyRow,
    searchButton,
    deleteButton,
    fetchStockPrice,
    currentTheme,
}) => {
    const lastRowRef = useRef(null); // 마지막 행을 참조할 ref
    const [rowCount, setRowCount] = useState(data.length); // 행 수 상태

    useEffect(() => {
        if (lastRowRef.current) {
            lastRowRef
                .current
                .scrollIntoView({behavior: 'smooth'});
        }
    }, [rowCount]); // data가 변경될 때마다 실행

    const formatCurrency = (amount) => {
        return new Intl
            .NumberFormat('ko-KR', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            })
            .format(amount);
    };

    const adjustWeights = (index, value) => {
        const newDesiredWeights = [...desiredWeights];
        newDesiredWeights[index] = Math.min(100, Math.max(0, value)); // 범위 제한

        handleWeightChange(index, newDesiredWeights[index]);
    };

    const handleAddEmptyRow = () => {
        addEmptyRow(); // 빈 행 추가 함수 호출
        setRowCount(prevCount => prevCount + 1); // 행 수 증가
    };
    
    const fetchOneStockPrice = async (stock, index) => {
        try {
        const response = await fetchStockPrice(stock.name, stock.marketType); // currentPrice에 가격 저장
        const updatedPrice = response; // API 호출로 받은 가격
        const updatedCurrentPrice = updatedPrice * stock.quantity;
        
        console.log(response, updatedPrice, stock.price);
        
        if (response === '0' || response === null) {
            alert("주식 정보를 불러올 수 없습니다")
        } else {
            handleChange(index, 'price', updatedPrice); // 가격 업데이트
            handleChange(index, 'currentPrice', updatedCurrentPrice);

        }
        } catch (error) {
            console.error("주식 가격을 불러오는 데 오류가 발생했습니다.", error);
        }
    }

    const moneyButton = (index) => {
        const isConfirmed = window.confirm('현금으로 바꾸시면 변경이 불가능합니다.');

        if (isConfirmed) {
        handleChange(index, 'name', '원화');
        handleChange(index, 'price', false);
        handleChange(index, 'quantity', false);
        } 
    }

    return (
        <Table className="custom-table">
            <thead style={{ backgroundColor: currentTheme.colors.TheadBg, color: currentTheme.colors.TableText }}>
                <tr>
                    <th rowSpan="2" className="th">종목명</th>
                    <th rowSpan="2" className="option-button"></th>
                    <th rowSpan="2" className="th">주가</th>
                    <th colSpan="3">현재</th>
                    <th rowSpan="2" className="th">희망비중</th>
                    <th colSpan="3">리밸런싱</th>
                    <th rowSpan="2" className="th">수량조절</th>
                </tr>
                <tr>
                    <th className="th">수량</th>
                    <th className="th">잔고 (₩)</th>
                    <th className="percent">비중 (%)</th>
                    <th className="percent">비중 (%)</th>
                    <th className="th">희망투자금 (₩)</th>
                    <th className="th">희망수량</th>
                    <th style={{width: '5px'}} />
                </tr>
            </thead>
            <tbody style={{ backgroundColor: currentTheme.colors.SwitchWrapper, color: currentTheme.colors.TableText }}>
                {
                    data.map((item, index) => {

                        if (item.price === '0' || item.price === null) {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    fetchOneStockPrice(item, index); // 엔터 키가 눌리면 searchButton 호출
                                                    e.preventDefault(); // 기본 동작 방지
                                                }
                                            }}
                                            placeholder="종목 입력"
                                            style={{
                                                color: currentTheme.colors.MainFont}}
                                            />
                                    </td>
                                    {
                                        item.name !== "달러"
                                            ? (deleteButton(item.marketType, index))
                                            : (<td className="option-button"/>)
                                    }
                                    {
                                        item.name !== "달러"
                                            ? (searchButton(item, index))
                                            : (<td className="option-button"/>)
                                    }
                                    <td>
                                        <div className="money-button" onClick={() => moneyButton(index)}>
                                            <span>현금</span>
                                        </div>
                                    </td>
                                    <td style={{width:'1000px'}}/>

                                </tr>
                            );
                        }
                        // 현재 잔고
                        const currentprice = item.id == 1
                            ? item.currentPrice
                            : item.price * item.quantity;

                        // 현재 비중
                        const currentBalance = currentTotalBalance > 0
                            ? (currentprice / currentTotalBalance) * 100
                            : 0;

                        // 현재 종목의 희망 비중
                        const currentDesiredWeight = parseFloat(desiredWeights[index]) || 0;

                        // 리밸런싱 비중 계산
                        const rebalanceWeight = totalDesiredWeight > 0
                            ? (currentDesiredWeight / totalDesiredWeight) * 100
                            : 0;

                        // 희망 투자금 계산
                        const desiredInvestment = currentTotalBalance * (rebalanceWeight / 100);

                        // 희망 수량 계산
                        const desiredQuantity = item.name === "달러"
                            ? desiredInvestment
                            : desiredInvestment / item.price;

                        // 조절 수량
                        const quantityControl = item.name === "달러"
                            ? desiredQuantity - item.currentPrice
                            : desiredQuantity - item.quantity;

                        // 조절 수량 스타일 결정
                        const quantityControlStyle = quantityControl > 0
                            ? 'text-plus'
                            : 'text-minus'; // 양수는 빨간색, 음수는 파란색
                        const quantityControlValue = quantityControl > 0
                            ? `+${quantityControl.toFixed(2)}`
                            : quantityControl.toFixed(2);

                        return (
                            <tr key={item.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        style={{ color: currentTheme.colors.TableText, fontWeight: 'bolder'}}
                                        />
                                </td>
                                {deleteButton(item.marketType, index)}
                                {
                                    item.name === "달러"
                                        ? ( // 주가
                                                <td></td>)
                                        : (<td className="money-expression">$ {formatCurrency(item.price)}</td>)
                                }

                                <td>
                                    {
                                        (item.name === "달러")
                                            ? ("")
                                            : (
                                                <input
                                                    className="number"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const newQuantity = e.target.value;
                                                        handleChange(index, 'quantity', newQuantity);
                                                        handleChange(index, 'currentPrice', newQuantity * item.price);
                                                    }}
                                                    style={{ color: currentTheme.colors.TableText}}
                                                    />
                                            )
                                    }
                                </td>
                                <td>

                                    {
                                        item.name === "달러"
                                            ? (
                                                <input
                                                    className="number"
                                                    type="number"
                                                    value={item.currentPrice}
                                                    onChange={(e) => {
                                                        const newCurrentPrice = Number(e.target.value);
                                                        handleChange(index, 'currentPrice', newCurrentPrice);;
                                                    }}
                                                    style={{ color: currentTheme.colors.TableText}}
                                                    />
                                            )
                                            : (<span>{formatCurrency(item.currentPrice)}</span>)
                                    }
                                </td>
                                <td className="percent">{formatCurrency(currentBalance.toFixed(2))}
                                    %</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={desiredWeights[index]}
                                        onChange={(e) => adjustWeights(index, e.target.value)}
                                        style={{ color: currentTheme.colors.TableText}}
                                        />
                                </td>
                                <td className="percent">{rebalanceWeight.toFixed(2)}%</td>
                                {/* 리밸런싱 비중 표시 */}
                                <td>{formatCurrency(desiredInvestment)}</td>
                                {/* 희망투자금 표시 */}
                                <td>{desiredQuantity.toFixed(2)}</td>
                                {/* 희망수량 표시 */}
                                <td className={quantityControlStyle}>{quantityControlValue}</td>
                                {/* 조절 수량 표시 */}
                            </tr>
                        );
                    })
                }
                <tr ref={lastRowRef}>
                    {/* 마지막 행에 ref 추가 */}
                    <td className="td11" onClick={handleAddEmptyRow}>
                        <h2>종목 추가</h2>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

TableDO.propTypes = {
    data: PropTypes.array.isRequired,
    totalBalance: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    desiredWeights: PropTypes.array.isRequired,
    handleWeightChange: PropTypes.func.isRequired,
    foreignDesiredWeights: PropTypes.array.isRequired,
    totalDesiredWeight: PropTypes.number.isRequired
};

export default TableDO;
