import React from 'react';

import NavBar from './components/Navbar/Navbar';

import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
