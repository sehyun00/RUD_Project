// feature
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// css
import "./App.css";

// components
import Home from './views/home';
import Login from './views/login';

// component-items
import Header from "./views/componentItems/header";
import Log from "./views/components/log";

function App() {
    // localStorage에서 초기값을 가져옵니다.
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
        <>
            <Header logoutHandler={logoutHandler} loginState={loginState}/>
            <Routes>
                <Route path='/login' element={loginState ? <Navigate to="/home" /> : <Login loginHandler={loginHandler}/>} />
                <Route path='/home' element={loginState ? <Home userID={userID} loginState={loginState}/> : <Navigate to="/login" />} />
                <Route path="/log" element={loginState ? <Log userID={userID}/> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to={loginState ? "/home" : "/login"} />} />
            </Routes>
        </>
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
