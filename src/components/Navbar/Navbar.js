import React from 'react';
import './Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="brand-name">dashBoard</span>
            </div>
            <div className="navbar-center">
                <a href="#tech">Tech Used</a>
                <a href="#backend">Backend-Link</a>
                {/* <a href="#changelog">ChangeLog</a> */}
                <a href="#faq">FAQ</a>
                <a href="#about">About</a>
            </div>
            <div className="navbar-right">
                <button className="github-button">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
                    <span>Star</span>
                    <span className="star-count">2</span>
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
