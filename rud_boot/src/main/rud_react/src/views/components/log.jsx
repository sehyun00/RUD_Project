import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import axios from 'axios';
import * as XLSX from 'xlsx';

// scss
import '../../assets/css/components/log.scss';

// 변동률 계산 함수
const calculateChangeRate = (current, previous) => {
    if (previous === 0 || previous === undefined) return '0.00';
    const changeRate = ((current - previous) / previous) * 100;
    return changeRate.toFixed(2); // 변동률 값만 반환
};

// Log 컴포넌트, 파일명이랑 동일 생성자 느낌인가
const Log = () => {
    const [logData, setLogData] = useState([]);
    const [isAscending, setIsAscending] = useState(false);

    // API 요청 함수
    const fetchLogData = async () => {
        try {
            const response = await axios.post('http://localhost:8081/rud/log', {
                userId: 'zxcv', // 더미 데이터 바꿔야함
            });
            setLogData(response.data);
        } catch (error) {
            console.error('Error fetching log data:', error);
        }
    };

    useEffect(() => {
        fetchLogData();
    }, []);

    // 정렬 함수 ...
    const sortedLogData = logData.sort((a, b) => {
        return isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    });

    // 날짜 클릭 핸들러
    const handleDateClick = () => {
        setIsAscending(!isAscending);
    };

    // Excel 파일 다운로드 함수
    const downloadExcel = async (date) => {
        try {
            const response = await axios.post('http://localhost:8081/rud/csv', {
                userId: 'zxcv', // 더미 데이터 바꿔야함
                rudDate: date,
            });

            const data = response.data;

            // 여기에 넣어줘서 excel로 만듬
            const excelData = [];

            // 총자산 헤더 추가
            excelData.push(['총자산']);
            data.forEach((item) => {
                excelData.push([item.total]);
            });

            // 빈 줄 추가
            excelData.push([]);

            // 지갑 정보 추가
            excelData.push(['원화', '원화비율', '달러', '달러비율', '환율']);
            data.forEach((item) => {
                excelData.push([
                    item.wallet.won,
                    item.wallet.wonPer,
                    item.wallet.dollar,
                    item.wallet.dollarPer,
                    item.wallet.exchange,
                ]);
            });

            // 빈 줄 추가
            excelData.push([]);

            // RUD 데이터 헤더 추가
            excelData.push([
                '종목명',
                '가격(원)',
                '수량',
                '잔고',
                '비중',
                '희망비중',
                '희망투자금',
                '수량조절',
                '거래소',
            ]);
            data.forEach((item) => {
                item.rud.forEach((rudItem) => {
                    //해외장이면 환율 곱
                    const marketOrder = rudItem.paul ? rudItem.marketOrder * item.wallet.exchange : rudItem.marketOrder;
                    excelData.push([
                        // 주식명
                        rudItem.stockName,
                        // 가격
                        marketOrder,
                        //수량
                        rudItem.nos,
                        // 잔고
                        marketOrder * rudItem.nos,
                        // 비중
                        (marketOrder * rudItem.nos) / item.total,
                        // 희망 비중
                        rudItem.expertPer,
                        //희망 투자금
                        rudItem.expertPer * item.total,
                        // 수량조절
                        (rudItem.expertPer * item.total) / marketOrder > 0
                            ? `+${(rudItem.expertPer * item.total) / marketOrder}`
                            : `-${(rudItem.expertPer * item.total) / marketOrder}`,
                        //거래소
                        rudItem.paul ? '해외' : '국내',
                    ]);
                });
            });

            // 2차원 배열을 사용하여 시트 생성
            const worksheet = XLSX.utils.aoa_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Log Data');

            // Excel 파일 다운로드
            XLSX.writeFile(workbook, `${date}_log.xlsx`);
        } catch (error) {
            console.error('Error fetching CSV data for Excel:', error);
        }
    };

    // 각 행 클릭 핸들러
    const handleRowClick = (date) => {
        if (window.confirm(`${date}.xlsx 파일을 다운로드 하시겠습니까?`)) {
            downloadExcel(date);
        }
    };

    return (
        <div className="log-container">
            <div className="contents-container">
                <div className="switch-container">
                    <div className="table-switch-wrapper">
                        <div className="table-switch">
                            <div>
                                <span>내 기록</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <div className="table-wrapper">
                        <Table className="custom-table">
                            <thead>
                                <tr>
                                    <th className="th"></th>
                                    <th className="th" onClick={handleDateClick} style={{ cursor: 'pointer' }}>
                                        날짜
                                    </th>
                                    <th className="th">총자산</th>
                                    <th className="th">종목수</th>
                                    <th className="th">전 기록 대비 변동률</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedLogData.map((row, index) => {
                                    // 이전 날짜의 총자산을 가져옴
                                    const previousTotal =
                                        index < sortedLogData.length - 1 ? sortedLogData[index + 1].total : undefined;

                                    // 변동률 계산
                                    const changeRate = calculateChangeRate(row.total, previousTotal);

                                    // + 빨강, - 파랑
                                    const changeRateStyle = changeRate && changeRate > 0 ? 'text-plus' : 'text-minus';

                                    return (
                                        <tr onClick={() => handleRowClick(row.date)}>
                                            <td>{sortedLogData.length - index}</td>
                                            <td>{row.date}</td>
                                            <td>{row.total.toLocaleString()}원</td>
                                            <td>{row.stockCount}개</td>
                                            <td className={changeRateStyle}>
                                                {changeRate !== '0.00'
                                                    ? `${changeRate > 0 ? '+' : ''}${changeRate}%`
                                                    : ''}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

Log.propTypes = {
    classes: PropTypes.object,
};

export default Log;
