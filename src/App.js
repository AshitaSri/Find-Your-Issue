import React from 'react';
import NavBar from './components/Navbar/Navbar';
// import dashboard from './components/dashboard/dashboard'
import Page from './components/page/page';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/themes.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <NavBar />
        <div className="content">
          <Page />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;