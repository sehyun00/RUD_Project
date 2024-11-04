// feature
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

// scss
import '../../assets/css/components/log.scss';

// dummy
const logData = [
    { id: 1, date: '2024-10-01', totalAssets: 4796657, itemCount: 1 },
    { id: 2, date: '2024-10-02', totalAssets: 4986663, itemCount: 18 },
    { id: 3, date: '2024-10-03', totalAssets: 4393176, itemCount: 19 },
    { id: 4, date: '2024-10-04', totalAssets: 4747154, itemCount: 18 },
    { id: 5, date: '2024-10-05', totalAssets: 5597602, itemCount: 17 },
    { id: 6, date: '2024-10-06', totalAssets: 5229597, itemCount: 12 },
    { id: 7, date: '2024-10-07', totalAssets: 5872709, itemCount: 13 },
    { id: 8, date: '2024-10-08', totalAssets: 5794438, itemCount: 20 },
    { id: 9, date: '2024-10-09', totalAssets: 5183997, itemCount: 19 },
    { id: 10, date: '2024-10-10', totalAssets: 5352869, itemCount: 18 },
];

// 변동률 계산 함수
const calculateChangeRate = (current, previous) => {
    if (previous === 0) return '';
    const changeRate = ((current - previous) / previous) * 100;
    return `${changeRate > 0 ? '+' : ''}${changeRate.toFixed(2)}%`;
};

// Log 컴포넌트
const Log = () => {
    // 정렬 상태 추가 - 최신 날짜 최상단이 기본값
    const [isAscending, setIsAscending] = useState(false); 

    // 정렬 함수
    const sortedLogData = logData.sort((a, b) => {
        return isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    });

    // 날짜 정렬 변경시 변동률 계산 함수
    const logRows = sortedLogData.map((data, index) => {
        const previousTotalAssets = (isAscending || index === sortedLogData.length - 1) 
            ? (index > 0 ? sortedLogData[index - 1].totalAssets : 0) // 오름차순 또는 첫 번째 데이터
            : (index < sortedLogData.length - 1 ? sortedLogData[index + 1].totalAssets : 0); // 내림차순일 때

        // 변동률 계산
        const changeRate = data.id === 1 ? '' : calculateChangeRate(data.totalAssets, previousTotalAssets);

        return {
            ...data,
            changeRate // 변동률을 데이터에 추가
        };
    });

    // 날짜 클릭 핸들러
    const handleDateClick = () => {
        setIsAscending(!isAscending);
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
                <div className="table-header-container">
                    <div className="table-header-wrapper">
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th onClick={handleDateClick} style={{ cursor: 'pointer' }}>날짜</th>
                                    <th>총자산</th>
                                    <th>종목수</th>
                                    <th>전 기록 대비 변동률</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logRows.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.date}</td>
                                        <td>{row.totalAssets.toLocaleString()}원</td>
                                        <td>{row.itemCount}개</td>
                                        <td>{row.changeRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="table-body-container">
                    <div className="table-body-wrapper"></div>
                </div>
            </div>
        </div>
    );
};

Log.propTypes = {
    classes: PropTypes.object
};

export default Log;
