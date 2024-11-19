// feature
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// css
import "./App.css";

// components
import Home from './views/home';
import Login from './views/login';
import SignUp from "./views/signup";
import UploadTEST from "./views/components/uploadTEST"

// component-items
import Header from "./views/componentItems/header";
import Log from "./views/components/log";

function App() {
    console.log("씨이이이빨")

    // view
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/log" element={<Log/>} />
                <Route path="/uploadTEST" element={<UploadTEST/>} />
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
