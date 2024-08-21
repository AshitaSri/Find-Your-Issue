import React from 'react';

import NavBar from './components/Navbar/Navbar';

import DashboardLayout from './components/Dashboard/Dashboard';

function App() {

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <DashboardLayout />
      </div>
    </div>
  );
}

export default App;
