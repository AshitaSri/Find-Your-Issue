import React, { useState } from 'react';
import './Topics.css';

const Topics = () => {
    const availableTopics = ['HTML', 'CSS', 'JS', 'React', 'ExpressJS', 'Data Science', 'Data Mining'];
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleTopicChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue && !selectedTopics.includes(selectedValue)) {
            setSelectedTopics([...selectedTopics, selectedValue]);
        }
    };

    const removeTopic = (topic) => {
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
    };

    return (
        <div className="topics-container">
            <h3>TOPICS</h3>
            <select onChange={handleTopicChange} className="topics-dropdown">
                <option value="">Select Your Topics</option>
                {availableTopics.map(topic => (
                    <option key={topic} value={topic}>
                        {topic}
                    </option>
                ))}
            </select>
            <div className="selected-topics">
                <p>You have selected:</p>
                {selectedTopics.map((topic, index) => (
                    <div key={index} className="tag">
                        {topic} <span onClick={() => removeTopic(topic)}>×</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Topics;
