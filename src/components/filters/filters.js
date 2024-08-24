import React, { useState, useEffect } from 'react';
import './filters.css';

const Filters = () => {
    const [stars, setStars] = useState(0);
    const [displayStars, setDisplayStars] = useState('0');
    const [recentIssues, setRecentIssues] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const starRanges = [0, 25, 50, 100, 150, 250, 500, 1000, 5000, 10000, 20000, 50000];
    

    // const handleStarChange = (e) => {
    //     const value = parseInt(e.target.value);
    //     setStars(value);
    // };

    useEffect(() => {
        if (stars <= 1000) {
            setDisplayStars(`${stars}`);
        } else if (stars < 20000) {
            setDisplayStars(`${(stars / 1000).toFixed(1)}k`);
        } else {
            setDisplayStars(`${Math.round(stars / 1000)}k+`);
        }
    }, [stars]);

    const getStarRangeValue = (value) => {
        return starRanges.findIndex(range => value <= range);
    };

    return (
        <div className="filters">
            <h3>Filters</h3>
            <div className="star-filter">
                <label htmlFor="stars">Minimum Stars: {displayStars}</label>
                <input 
                    type="range" 
                    id="stars" 
                    min="0" 
                    max={starRanges.length - 1} 
                    value={getStarRangeValue(stars)}
                    onChange={(e) => setStars(starRanges[e.target.value])}
                    className="star-range"
                    step="1"
                />
                
            </div>
            <div className="checkbox-filters">
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        checked={recentIssues} 
                        onChange={() => setRecentIssues(!recentIssues)}
                    />
                    <span className="checkbox-text">Recently added issues (unassigned)</span>
                </label>
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        checked={bookmarked} 
                        onChange={() => setBookmarked(!bookmarked)}
                    />
                    <span className="checkbox-text">Bookmarked</span>
                </label>
            </div>
        </div>
    );
};

export default Filters;