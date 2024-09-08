import React, { useState } from 'react';
import Topics from '../Topics/Topics';
import './page.css';
import Home from '../Home/home';
import Filters from '../filters/filters';

const Page = () => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [stars, setStars] = useState(0);
    const [recentIssues, setRecentIssues] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <div className="dashboard-layout">
            <div className="left-side">
                <Topics 
                    selectedTopics={selectedTopics} 
                    setSelectedTopics={setSelectedTopics} 
                />
                <Filters 
                    stars={stars}
                    setStars={setStars}
                    recentIssues={recentIssues}
                    setRecentIssues={setRecentIssues}
                    bookmarked={bookmarked}
                    setBookmarked={setBookmarked}
                />
            </div>
            <div className="main-content">
                <Home 
                    selectedTopics={selectedTopics}
                    stars={stars}
                    recentIssues={recentIssues}
                    bookmarked={bookmarked}
                />
            </div>
        </div>
    );
};

export default Page;