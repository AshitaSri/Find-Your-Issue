import React from 'react';
import Topics from '../Topics/Topics';
import './Dashboard.css';
import Home from '../Home/home';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <div className="left-side">
                <Topics />
                {/* Add other sidebar components here, such as Schedule, Difficulty, etc. */}
            </div>
            <div className="main-content">
                {/* Add your main content here, such as the search bar, etc. */}
                <Home />
            </div>
            
        </div>
    );
};

export default DashboardLayout;
