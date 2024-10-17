// features
import React from "react";
import PropTypes from 'prop-types';

// components
import StockTable from "./components/stockTable";

const Home = () => {
    return (<div>
        <StockTable/>
    </div>);
};

Home.propTypes = {
    classes: PropTypes.object
}

export default Home;