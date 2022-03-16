import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar  from './Components/Layout/NavBar';
import Landing from './Components/Layout/Landing';
import Login   from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Alert   from './Components/Layout/Alert';
import './App.css';
// Redux
import { Provider }  from 'react-redux';
import setAuthToken  from '../src/Utils/setAuthToken';
import { loadUser }  from './Actions/auth';
import Dashboard     from './Components/Dashboard/Dashboard';
import PrivateRoute  from './Components/Routing/PrivateRoute';
import CreateProfile from './Components/Profile-Form/CreateProfile';
import EditProfile   from './Components/Profile-Form/EditProfile';
import AddExperience from './Components/Profile-Form/AddExperience';
import AddEducation  from './Components/Profile-Form/AddEducation';
import Profiles from './Components/Profiles/Profiles';
// import ProfileItem from './Components/Profiles/ProfileItem';
import store from './store';

// we want this to run everytime to check for the token..
if(localStorage.token){
  setAuthToken(localStorage.token); 
};
const App = () => {
  // when the state updates, this will keep running UNLESS we add a second parameter => []
  // https://reactjs.org/docs/hooks-effect.html <== check for confirmation  

  useEffect(() => {
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
                  <Route        exact path='/login'          component={ Login }/>
                  <Route        exact path='/register'       component={ Register }/>
                  <Route        exact path='/profiles'       component={ Profiles }/>
                  <PrivateRoute exact path='/dashboard'      component={ Dashboard } />
                  <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
                  <PrivateRoute exact path='/edit-profile'   component={ EditProfile }/>
                  <PrivateRoute exact path='/add-education'  component={ AddEducation }/>
                  <PrivateRoute exact path='/add-experience' component={ AddExperience }/>                  
                  {/* <PrivateRoute exact path='' component={}/> */}
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
)};


export default App;

