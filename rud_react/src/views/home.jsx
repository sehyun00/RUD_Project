// features
import React from "react";
import PropTypes from 'prop-types';

// scss
import '../assets/css/home.scss';

// components
import StockTable from "./components/stockTable";

// page
const Home = () => {
    return (
        <div>
            <StockTable/>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object
};

export default Home;
