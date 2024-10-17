import React from 'react';
import PropTypes from 'prop-types';

// core components
import Header from '../item_components/header.jsx';

// sections for this page
import PageTable from './sections/table.jsx';

// sections for this page

const Components = () => {
    return (
        <div id="main-wrapper">
            <Header/>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <PageTable/>
                </div>
            </div>
        </div>
    );
};

Components.propTypes = {
    classes: PropTypes.object
};

export default Components;
