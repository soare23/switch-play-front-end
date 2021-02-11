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
import { UserProvider } from './components/UserContext';
import UserRating from './components/review/UserRating';
import AddReview from './components/review/AddReview';
import RecievedDeals from './components/RecievedDeals';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path={'/register'} component={Register} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/homepage'} component={HomePage} />
          <Route exact path={'/profile'} component={UserProfile} />
          <Route exact path={'/recieved-deals'} component={RecievedDeals} />
          <Route exact path={'/add-game'} component={AddGame} />
          <Route exact path={'/search-game'} component={SearchGame} />
          <Route
            exact
            path={'/user-rating/:receivingUserId'}
            component={UserRating}
          />
          <Route
            exact
            path={'/add-review/:receivingUserId'}
            component={AddReview}
          />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
