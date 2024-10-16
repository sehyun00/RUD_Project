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
            {/* <Route path="/custom-components" element={<CustomComponents />} /> */}
            <Route path="/" element={<Components />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
