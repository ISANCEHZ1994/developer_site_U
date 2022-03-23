// shortcut => racfp
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 
const PrivateRoute = ({ 
    component: Component,     
    auth: { isAuthenticated, loading }, 
    ...rest 
}) => (                      // props - we want to check to see if were authenticated or not
    <Route 
        {...rest} 
        render={ 
            props => !isAuthenticated && !loading ? 
            ( <Redirect to='/login' /> ) 
            : 
            ( <Component {...props}/> )
        }
    />    
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapToStateProps = state => ({
    auth: state.auth
});

export default connect(mapToStateProps)(PrivateRoute);
