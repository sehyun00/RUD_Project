// feature
import React, {useState} from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// css
import "./App.css";

// components
import Home from './views/home';
import Login from './views/login';
import SignUp from "./views/signup";

// component-items
import Header from "./views/componentItems/header";
import Log from "./views/components/log";

function App() {
    const [loginState, setLoginState] = useState(false);
    const [userID, setUserID] = useState("");

    const loginHandler = (data) => {
        setLoginState(true);
        setUserID(data);
    }
    const logoutHandler = () => {
        setLoginState(false);
        setUserID(null);
    }

    // view
    return (
        <div>
            <Header logoutHandler={logoutHandler} loginState={loginState}/>
            <Routes>
                <Route path='/login' element={<Login loginHandler={loginHandler}/>} />
                <Route path="/signup" element={<SignUp />} />

                <Route path='/home' element={<Home userID={userID}/>} />
                <Route path="/log" element={<Log userID={userID}/>} />
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
