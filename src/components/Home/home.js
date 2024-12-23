// Home.js
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { GitBranch, Star, MessageCircle } from 'lucide-react';
import SearchBar from '../seachBar/SearchBar';
import './home.css';


const Home = ({ selectedTopics, stars, recentIssues }) => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedRepo, setExpandedRepo] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(0); // New state for forcing updates

    // Effect to handle search filtering whenever repos or search query changes
    useEffect(() => {
        if (searchQuery === '') {
            setFilteredRepos(repos);
        } else {
            const filtered = repos.filter(repo =>
                repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredRepos(filtered);
        }
    }, [repos, searchQuery, updateTrigger]); // Added updateTrigger dependency

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setFilteredRepos([]); // Clear current results immediately
        
        try {
            const response = await axios.get('https://find-ashen.vercel.app/repos', {
                params: {
                    languages: selectedTopics.join(','),
                    maxStars: stars,
                    showOnlyWithIssues: recentIssues
                }
            });
            
            // Update states in sequence
            await setRepos(response.data.repos);
            setUpdateTrigger(prev => prev + 1); // Force a refresh
            setLoading(false);
        } catch (err) {
            setError('An error occurred while fetching repositories.');
            setLoading(false);
            setRepos([]);
            setFilteredRepos([]);
        }
    };

    // Rest of the component remains the same...
    const handleIssuesClick = (repoFullName, event) => {
        event.stopPropagation();
        window.open(`https://github.com/${repoFullName}/issues`, '_blank');
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
                    <SearchBar onSearch={handleSearch} />
                    <button 
                        onClick={handleGenerate} 
                        className="generate-button"
                        disabled={loading} // Disable button while loading
                    >
                        <GitBranch className="button-icon" />
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>

            {loading && <div className="loading-spinner"></div>}
            {error && <div className="error-message">{error}</div>}

            {filteredRepos.length === 0 && !loading && !error && (
                <div className="empty-message">
                    <MessageCircle className="empty-icon" />
                    <p>🔍 No repositories found.</p>
                    <p>Try adjusting your filters or topics to find repositories! 🪄</p>
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
                                <button 
                                    className="issues-button"
                                    onClick={(e) => handleIssuesClick(repo.full_name, e)}
                                >
                                    <MessageCircle className="issues-icon" />
                                    <span>{repo.open_issues_count} issues</span>
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
                                <p>Click the issues button above to view available tasks for contribution.</p>
                                <p>This repository has {repo.open_issues_count} open issues to work on!</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;