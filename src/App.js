import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/login'} component={Login} />
      </Router>
    </div>
  );
}

export default App;
