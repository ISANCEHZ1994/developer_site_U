// Created for your NotFound.js file 
// which will let the user know that the url/page they are looking for does not exist
import React from 'react';
import { Route, Switch }  from 'react-router-dom';
import Dashboard          from '../Dashboard/Dashboard';
import PrivateRoute       from '../Routing/PrivateRoute';
import CreateProfile      from '../Profile-Form/CreateProfile';
import EditProfile        from '../Profile-Form/EditProfile';
import AddExperience      from '../Profile-Form/AddExperience';
import AddEducation       from '../Profile-Form/AddEducation';
import Profiles           from '../Profiles/Profiles';
import Profile            from '../Profile/Profile';
import Post               from '../Post/Post';
import Posts              from '../Posts/Posts'
import Login              from '../Auth/Login';
import Register           from '../Auth/Register';
import Alert              from '../Layout/Alert';
import NotFound           from '../Layout/NotFound';

const Routes = () => {    
  return (      
    <section className= "container">
      {/* outside of the switch because it can only have ROUTES inside */}
      <Alert/>
      <Switch>
          <Route        exact path='/login'          component={ Login }/>
          <Route        exact path='/register'       component={ Register }/>
          <Route        exact path='/profiles'       component={ Profiles }/>
          <Route        exact path="/profile/:id"    component={ Profile }/>
          <Route        component={ NotFound }/>                  
          <PrivateRoute exact path='/dashboard'      component={ Dashboard } />
          <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
          <PrivateRoute exact path='/edit-profile'   component={ EditProfile }/>
          <PrivateRoute exact path='/add-education'  component={ AddEducation }/>
          <PrivateRoute exact path='/add-experience' component={ AddExperience }/>
          <PrivateRoute exact path="/posts"          component={ Posts }/>
          <PrivateRoute exact path="/posts/:id"      component={ Post }/>
      </Switch>
    </section>
  );
};

export default Routes;
