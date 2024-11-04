// feature
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// css
import "./App.css";

// components
import Home from './views/home';
import Login from './views/login';
import SignUp from "./views/signup";
import Test from "./views/test";

// component-items
import Header from "./views/componentItems/header";

function App() {
    
    // view
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/test" element={<Test/>} />
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
