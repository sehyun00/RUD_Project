// feature
import React from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";

// css
import "./App.css";

// components
import Home from './views/home';
import Login from './views/login';
import Header from "./views/componentItems/header";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    
    // view
    return (
        <div
            className={isLoginPage
                ? "full-screen"
                : ""}>
            <Header/>
            <Routes>
                <Route path='/home' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (<BrowserRouter>
        <App/>
    </BrowserRouter>);
}

export default AppWrapper;
