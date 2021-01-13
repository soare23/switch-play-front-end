import React from 'react';
import Register from "./components/Register";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">

      <Navbar/>

      <Router>
        <Route exact path={'/register'} component={Register}/>
      </Router>

    </div>
  );
}

export default App;
