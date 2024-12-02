// feature
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// css
import "./App.css";

// components
import Home from './views/home';
import Login from './views/login';

// component-items
import Header from "./views/componentItems/header";
import Log from "./views/components/log";
import { lightTheme, darkTheme } from "./Theme.js";

function App() {
    // localStorage에서 초기값을 가져옵니노
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);
        const currentTheme = isDarkMode ? darkTheme : lightTheme;
        document.documentElement.style.backgroundColor = currentTheme.colors.colorBg; // html 배경색
        document.body.style.color = currentTheme.colors.colorMainFont; // body 텍스트 색상
    }, [isDarkMode]);

    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    const [loginState, setLoginState] = useState(() => {
        const savedLoginState = localStorage.getItem('loginState');
        return savedLoginState === 'true';
    });
    
    const [userID, setUserID] = useState(() => {
        return localStorage.getItem('userID') || '';
    });

    const loginHandler = (data) => {
        setLoginState(true);
        setUserID(data);
        localStorage.setItem('loginState', 'true');
        localStorage.setItem('userID', data);
    }

    const logoutHandler = () => {
        setLoginState(false);
        setUserID('');
        localStorage.removeItem('loginState');
        localStorage.removeItem('userID');
    }

    // view
    return (
        <html style={{ backgroundColor: currentTheme.colors.colorBg, color: currentTheme.colors.colorMainFont }}>
        {/* <div style={{ backgroundColor: currentTheme.colors.colorBg, color: currentTheme.colors.colorMainFont }}> */}

            <Header logoutHandler={logoutHandler} loginState={loginState} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
            <Routes>
                <Route path='/login' element={loginState ? <Navigate to="/home" /> : <Login loginHandler={loginHandler} currentTheme={currentTheme}/>} />
                <Route path='/home' element={loginState ? <Home userID={userID} loginState={loginState}  currentTheme={currentTheme}/> : <Navigate to="/login" />} />
                <Route path="/log" element={loginState ? <Log userID={userID}  currentTheme={currentTheme}/> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to={loginState ? "/home" : "/login"} />} />
            </Routes>
        {/* </div> */}
        </html>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
