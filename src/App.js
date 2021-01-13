import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import PreHomePage from './components/PreHomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/prehome'} component={PreHomePage} />
      </Router>
    </div>
  );
}

export default App;
