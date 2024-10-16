import React from "react";
import "./assets/scss/style.scss";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Components from "./views/components/components.jsx";
import Login from "./views/components/login.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      {/* <Route path="/custom-components" element={<CustomComponents />} /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
    <Routes>
      <Route path="/home" element={<Components />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
