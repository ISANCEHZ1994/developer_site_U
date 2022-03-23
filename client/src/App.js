import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar  from './Components/Layout/NavBar';
import Landing from './Components/Layout/Landing';
import setAuthToken  from '../src/Utils/setAuthToken';
import { Provider }  from 'react-redux';
import { loadUser }  from './Actions/auth';
import store from './store';
import './App.css';
import Routes from './Components/Routing/Routes';
// we want this to run everytime to check for the token..
if(localStorage.token){
  setAuthToken(localStorage.token); 
};

const App = () => {
  // when the state updates, this will keep running UNLESS we add a second parameter => []
  // https://reactjs.org/docs/hooks-effect.html <== check for confirmation  

  useEffect(() => {
    store.dispatch(loadUser());
  }, [  ]);

  return (
      <Provider store={ store }>
        <Router>
          <Fragment>
            <NavBar/>
            <Switch>
              <Route exact path= '/' component={ Landing }/>
              <Route component={Routes}/>
            </Switch>
          </Fragment>
        </Router>
      </Provider>
)};


export default App;

