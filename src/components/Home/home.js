import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../seachBar/SearchBar';
import './home.css';

const Home = () => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('https://find-ashen.vercel.app/repos');
                setRepos(response.data);
                setFilteredRepos(response.data);
                setLoading(false);
            } catch (err) {
                setError('An error occurred while fetching repositories.');
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const handleSearch = (query) => {
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

    const handleGenerate = () => {
        // Implement generate logic here if needed
        console.log('Generate clicked');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="home-container">
            <div className="search-container">
                <div className="search-wrapper">
                    <SearchBar onSearch={handleSearch} />
                    <button onClick={handleGenerate} className="generate-button">
                        Generate
                    </button>
                </div>
            </div>

            
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
                            lang: {repo.language} | stars: {repo.stargazers_count}K | 
                            {/* last activity: {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })} */}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;