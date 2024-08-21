import React from 'react';
import NavBar from './components/Navbar/Navbar';
import Dashboard from './components/dashboard/dashboard'

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
