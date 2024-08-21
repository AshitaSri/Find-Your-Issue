import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [tags, setTags] = useState(['HTML', 'CSS', 'JS', 'ExpressJS', 'React', 'CSS', 'Data Science', 'Data Mining']);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        // Implement search logic here if needed
        console.log('Search query:', query);
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-container">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Type Here To Search..."
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="tags-container">
                {tags.map((tag, index) => (
                    <div key={index} className="tag">
                        {tag} <span onClick={() => removeTag(index)}>×</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
