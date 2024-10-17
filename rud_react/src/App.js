import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from './views/home';
import Login from './views/login';
import Header from "./views/componentItems/header";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'; // 현재 경로가 /login인지 확인

    return (
        <div className={isLoginPage ? "full-screen" : ""}> {/* 조건부 클래스 적용 */}
            <Header />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default AppWrapper;
