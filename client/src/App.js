import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './Components/Layout/NavBar';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import './App.css';

// automaticlly returns
const App = () => (
  <Router>
    <Fragment>
      <NavBar/>
      <Route exact path= '/' component={ Landing }/>
      <section className= "container">
        <Switch>
            <Route exact path= '/login' component={ Login }/>
            <Route exact path= '/register' component={ Register }/>
        </Switch>
      </section>
    </Fragment>
  </Router>
);


export default App;

