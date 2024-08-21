import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../seachBar/SearchBar'; // Import the SearchBar component
import './home.css';

const Home = () => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]); // State for filtered repositories
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('https://find-ashen.vercel.app/repos');
                setRepos(response.data);
                setFilteredRepos(response.data); // Initialize filteredRepos with all data
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
            setFilteredRepos(repos); // If the query is empty, show all repos
        } else {
            const filtered = repos.filter(repo =>
                repo.name.toLowerCase().includes(query.toLowerCase()) ||
                (repo.description && repo.description.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredRepos(filtered);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-container">
            <div className="search-section">
                {/* <h1>Top GitHub Repositories</h1> */}
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="repos-container">
                <ul className="repos-list">
                    {filteredRepos.map(repo => (
                        <li key={repo.full_name} className="repo-item">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
                                {repo.name}
                            </a>
                            <p className="repo-description">{repo.description}</p>
                            <p className="repo-stats">
                                Stars: {repo.stargazers_count} | Language: {repo.language}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;