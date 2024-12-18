// Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { GitBranch, Star, MessageCircle } from 'lucide-react';
import SearchBar from '../seachBar/SearchBar';
import './home.css';

const Home = ({ selectedTopics, stars }) => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedRepo, setExpandedRepo] = useState(null);

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
            handleSearch(searchQuery);
        } catch (err) {
            setError('An error occurred while fetching repositories.');
            setLoading(false);
        }
    };

    const handleRepoClick = (repoName) => {
        setExpandedRepo(expandedRepo === repoName ? null : repoName);
    };

    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: '#f1e05a',
            Python: '#3572A5',
            'C++': '#f34b7d',
            Java: '#b07219',
            TypeScript: '#2b7489',
            default: '#6a737d'
        };
        return colors[language] || colors.default;
    };

    return (
        <div className="home-container">
            <div className="search-container">
                <div className="search-wrapper">
                    <SearchBar onSearch={setSearchQuery} />
                    <button onClick={handleGenerate} className="generate-button">
                        {/* <GitBranch className="button-icon" /> */}
                        Generate
                    </button>
                </div>
            </div>

            {loading && <div className="loading-spinner"></div>}
            {error && <div className="error-message">{error}</div>}

            {filteredRepos.length === 0 && !loading && !error && (
                <div className="empty-message">
                    <MessageCircle className="empty-icon" />
                    <p>🔍 Oops! Nothing to see here yet.</p>
                    <p>Add some filters or topics to get started, and watch the magic happen! 🪄</p>
                </div>
            )}

            <div className="repos-container">
                {filteredRepos.map(repo => (
                    <div 
                        key={repo.full_name}
                        className={`repo-card ${expandedRepo === repo.full_name ? 'expanded' : ''}`}
                        onClick={() => handleRepoClick(repo.full_name)}
                    >
                        <div className="repo-content">
                            <div className="repo-header">
                                <div className="repo-title">
                                    <GitBranch className="repo-icon" />
                                    <a 
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="repo-name"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {repo.full_name}
                                    </a>
                                </div>
                                <button className="issues-button">
                                    <MessageCircle className="issues-icon" />
                                    <span>{repo.open_issues} issues</span>
                                </button>
                            </div>

                            <p className="repo-description">{repo.description}</p>

                            <div className="repo-stats">
                                <div className="repo-language">
                                    <span 
                                        className="language-dot"
                                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                                    ></span>
                                    <span>{repo.language}</span>
                                </div>
                                <div className="repo-stars">
                                    <Star className="star-icon" />
                                    <span>{repo.stargazers_count}</span>
                                </div>
                            </div>
                        </div>

                        {expandedRepo === repo.full_name && (
                            <div className="repo-expanded">
                                <p>Click "issues" to view available tasks for contribution.</p>
                                <p>More details coming soon!</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;