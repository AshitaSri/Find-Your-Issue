import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './Navbar.css';


const NavBar = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="brand-name">FindYourIssue</span>
            </div>
            <div className="navbar-center">
                <a href="#tech">Tech Used</a>
                <a href="https://github.com/AshitaSri/Find-Your-Issue-backend">Backend-Link</a>
                {/* <a href="#changelog">ChangeLog</a> */}
                <a href="#about">About</a>
            </div>
            <div className="navbar-right">
                <a href="https://github.com/AshitaSri/Find-Your-Issue" target="_blank" rel="noopener noreferrer">
                    <button className="github-button">
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
                        <span>Star</span>
                        <span className="star-count">3</span>
                    </button>
                </a>
            </div>
            <button 
                onClick={toggleTheme} 
                className="theme-toggle"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </nav>
    );
};

export default NavBar;
