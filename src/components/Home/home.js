// Home.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../seachBar/SearchBar';
import './home.css';

const Home = ({ selectedTopics, stars }) => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredRepos(repos);
        } else {
            const filtered = repos.filter(repo =>
                repo.name.toLowerCase().includes(query.toLowerCase()) ||
                (repo.description && repo.description.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredRepos(filtered);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://find-ashen.vercel.app/repos', {
                params: {
                    languages: selectedTopics.join(','),
                    maxStars: stars
                }
            });
            setRepos(response.data.repos);
            setFilteredRepos(response.data.repos);
            setLoading(false);
            // Apply search after generating repos
            handleSearch(searchQuery);
        } catch (err) {
            setError('An error occurred while fetching repositories.');
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <div className="search-container">
                <div className="search-wrapper">
                    <SearchBar onSearch={setSearchQuery} />
                    <button onClick={handleGenerate} className="generate-button">
                        Generate
                    </button>
                </div>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {filteredRepos.length === 0 && !loading && !error && (
                <div className="empty-message">
                    <p>
                        🔍 Oops! Nothing to see here yet. Find Your Issue curates easy pickings from popular open-source projects, helping you make your first contribution. 
                    </p>
                    <p>
                        Add some filters or topics to get started, and watch the magic happen! 🪄
                    </p>
                </div>
            )}

            <div className="repos-container">
                <ul className="repos-list">
                    {filteredRepos.map(repo => (
                        <li key={repo.full_name} className="repo-item">
                            <div className="repo-header">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
                                    {repo.full_name}
                                </a>
                                <span className="repo-issues">{repo.open_issues} issues</span>
                            </div>
                            <p className="repo-description">{repo.description}</p>
                            <p className="repo-stats">
                                lang: {repo.language} | stars: {repo.stargazers_count}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;