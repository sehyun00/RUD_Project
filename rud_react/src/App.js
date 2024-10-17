// features
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

// css
import "./App.css";

// 컴포넌트
import Home from './views/home';
import Login from './views/login';

// 페이지
function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
