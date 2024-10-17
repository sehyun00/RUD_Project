import React from 'react';
import './assets/scss/style.scss';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Components from './views/components/components.jsx';
import Login from './views/components/login.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Login />}/> {/* 기본 페이지를 로그인 페이지로 변경 */}
            <Route path="/home" element={<Components />}/>
        </Routes>
    </Router>
);
