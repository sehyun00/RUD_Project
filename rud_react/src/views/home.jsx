// features
import React from "react";
import PropTypes from 'prop-types';
import '../assets/css/home.css'; 

// components
import StockTable from "./components/stockTable";
import Header from "./componentItems/header";

// page
const Home = () => {
    return (
        <div>
            <Header/>
            <div>
                <StockTable/>
            </div>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
