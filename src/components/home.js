import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';


const Home = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('https://find-i853pxguo-ashitasris-projects.vercel.app//repos');
                setRepos(response.data);
                setLoading(false);
            } catch (err) {
                setError('An error occurred while fetching repositories.');
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Top GitHub Repositories</h1>
            <ul>
                {repos.map(repo => (
                    <li key={repo.full_name}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                        <p>{repo.description}</p>
                        <p>Stars: {repo.stargazers_count}</p>
                        <p>Language: {repo.language}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
