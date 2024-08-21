import React from 'react';
import NavBar from './components/Navbar/Navbar';
// import dashboard from './components/dashboard/dashboard'
import Page from './components/page/page';

function App() {

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        {/* <dashboard /> */}
        <Page/>
      </div>
    </div>
  );
}

export default App;
