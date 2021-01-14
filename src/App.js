import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import AddGame from './components/AddGame';
import SearchGame from './components/SearchGame';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/homepage'} component={HomePage} />
        <Route exact path={'/profile'} component={UserProfile} />
        <Route exact path={'/add-game'} component={AddGame} />
        <Route exact path={'/search-game'} component={SearchGame} />
      </Router>
    </div>
  );
}

export default App;
