// SearchBar.js
import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Type Here To Search..."
                    className="search-input"
                />
            </div>
        </div>
    );
};

export default SearchBar;