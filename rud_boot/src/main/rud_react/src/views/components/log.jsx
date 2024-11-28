import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import '../../assets/css/components/log.scss';

// 더미 데이터 ...
const logData = [
    {
        id: 1,
        date: '2024-10-01',
        totalAssets: 4796657,
        itemCount: 1
    }, {
        id: 2,
        date: '2024-10-02',
        totalAssets: 4986663,
        itemCount: 18
    }, {
        id: 3,
        date: '2024-10-03',
        totalAssets: 4393176,
        itemCount: 19
    }, {
        id: 4,
        date: '2024-10-04',
        totalAssets: 4747154,
        itemCount: 18
    }, {
        id: 5,
        date: '2024-10-05',
        totalAssets: 5597602,
        itemCount: 17
    }, {
        id: 6,
        date: '2024-10-06',
        totalAssets: 5229597,
        itemCount: 12
    }, {
        id: 7,
        date: '2024-10-07',
        totalAssets: 5872709,
        itemCount: 13
    }, {
        id: 8,
        date: '2024-10-08',
        totalAssets: 5794438,
        itemCount: 20
    }, {
        id: 9,
        date: '2024-10-09',
        totalAssets: 5183997,
        itemCount: 19
    }, {
        id: 10,
        date: '2024-10-10',
        totalAssets: 5352869,
        itemCount: 18
    }
];

// 변동률 계산 함수 ...
const calculateChangeRate = (current, previous) => {
    if (previous === 0) 
        return '';
    const changeRate = ((current - previous) / previous) * 100;
    return `${changeRate > 0
        ? '+'
        : ''}${changeRate.toFixed(2)}%`;
};

// CSV 파일 다운로드 함수
const downloadCSV = (date) => {
    const csvContent = `data:text/csv;charset=utf-8,${date} 날짜,총자산,종목수\n` +
        logData.map(row => `${row.date},${row.totalAssets},${row.itemCount}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${date}.csv`);
    document.body.appendChild(link); // Firefox 호환성

    link.click();
};

// Log 컴포넌트
const Log = ({userID}) => {
    const [isAscending, setIsAscending] = useState(false);

    // 정렬 함수 ...
    const sortedLogData = logData.sort((a, b) => {
        return isAscending
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
    });

    // 날짜 클릭 핸들러
    const handleDateClick = () => {
        setIsAscending(!isAscending);
    };

    // 각 행 클릭 핸들러
    const handleRowClick = (date) => {
        if (window.confirm(`${date}.csv 파일을 다운로드 하시겠습니까?`)) {
            downloadCSV(date);
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
                                    <th className="th"
                                        onClick={handleDateClick}
                                        style={{ cursor: 'pointer' }}>날짜</th>
                                    <th className="th">총자산</th>
                                    <th className="th">종목수</th>
                                    <th className="th">전 기록 대비 변동률</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sortedLogData.map((row) => (
                                        <tr key={row.id} onClick={() => handleRowClick(row.date)}>
                                            <td>{row.id}</td>
                                            <td>{row.date}</td>
                                            <td>{row.totalAssets.toLocaleString()}원</td>
                                            <td>{row.itemCount}개</td>
                                            <td>{row.changeRate}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

Log.propTypes = {
    classes: PropTypes.object
};

export default Log;
