import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './Components/Layout/NavBar';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Alert from './Components/Layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from '../src/Utils/setAuthToken';
import { loadUser } from './Actions/auth';

import './App.css';

// we want this to run everytime to check for the token..
if(localStorage.token){
  setAuthToken(localStorage.token); 
};

const App = () => {

  // when the state updates, this will keep running UNLESS we add a second parameter => []
  // https://reactjs.org/docs/hooks-effect.html <== check for confirmation
  
  useEffect(() => {
    // taking the store directly
    store.dispatch(loadUser());
  }, []);

  return (
      <Provider store={ store }>
        <Router>
          <Fragment>
            <NavBar/>
            <Route exact path= '/' component={ Landing }/>
            <section className= "container">
              {/* outside of the switch because it can only have ROUTES inside */}
              <Alert/>
              <Switch>
                  <Route exact path= '/login' component={ Login }/>
                  <Route exact path= '/register' component={ Register }/>
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
)};


export default App;

