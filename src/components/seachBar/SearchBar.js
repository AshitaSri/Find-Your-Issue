import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // const handleSearch = () => {
    //     // Implement search logic here if needed
    //     console.log('Search query:', query);
    // };

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
                {/* <button onClick={handleSearch} className="search-button">
                    <i className="fas fa-search"></i>
                </button> */}
            </div>
            
        </div>
    );
};

export default SearchBar;
