import React from 'react';
import './assets/scss/style.scss';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Components from './views/components/components.jsx';
import Login from './views/components/login.jsx';
import CustomComponents from './views/custom-components/custom-components.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

var hist = createBrowserHistory();
root.render(
    <HashRouter history={hist}>
        <Routes>
            <Route path="/" element={<Login />} /> {/* 기본 페이지를 로그인 페이지로 변경 */}
            <Route path="/home" element={<Components />} />
        </Routes>
    </HashRouter>
);
