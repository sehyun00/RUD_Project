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

            // Excel 파일로 변환
            const excelData = [];

            data.forEach((item) => {
                // 총자산 정보 추가
                excelData.push({
                    total: item.total,
                });

                // 빈 줄 추가
                excelData.push({});

                // 지갑 정보 추가
                excelData.push({
                    won: item.wallet.won,
                    wonPer: item.wallet.wonPer,
                    dollar: item.wallet.dollar,
                    dollarPer: item.wallet.dollarPer,
                    exchange: item.wallet.exchange,
                });

                // 빈 줄 추가
                excelData.push({});

                // RUD 데이터 추가
                item.rud.forEach((rudItem) => {
                    excelData.push({
                        stockName: rudItem.stockName,
                        marketOrder: rudItem.marketOrder,
                        nos: rudItem.nos,
                        balance: '', // 빈 값으로 설정
                        currentPer: '', // 빈 값으로 설정
                        expertPer: rudItem.expertPer,
                        expertInvestment: '', // 빈 값으로 설정
                        expertNos: '', // 빈 값으로 설정
                        adjustmentNos: '', // 빈 값으로 설정
                        nasdaq: rudItem.paul ? '해외' : '국내', // 예시로 추가
                    });
                });

                // 빈 줄 추가
                excelData.push({});
            });

            const worksheet = XLSX.utils.json_to_sheet(excelData, { header: Object.keys(excelData[0]) });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Log Data');

            // Excel 파일 다운로드
            XLSX.writeFile(workbook, `${date}_log_data.xlsx`);
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

                                    // 스타일 클래스 설정
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
