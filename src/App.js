import React from 'react';
import NavBar from './components/Navbar/Navbar';
import dashboard from './components/dashboard/dashboard'

function App() {

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <dashboard />
      </div>
    </div>
  );
}

export default App;
