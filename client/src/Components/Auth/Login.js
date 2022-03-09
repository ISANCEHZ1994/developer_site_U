import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../Actions/auth';
import { prototype } from 'jsonwebtoken/lib/JsonWebTokenError';

const Login = ({ login, isAuthenticated }) => {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = formData;
    const onChange = e => setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password) // now using the deconstructed function here!
        console.log('SUCCESS')
    };

    // when logged in we want to go somewhere
    if(isAuthenticated){
      return <Redirect to="/dashboard"/>
    }

    return (
        <section className="container">
            
        {/* <div className="alert alert-danger">
          Invalid credentials
        </div> */}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={ e => onSubmit(e) }>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value= { email }
              onChange={ e => onChange(e) }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={ password }
              onChange={ e => onChange(e) }
            />
          </div>
          <input 
            type="submit" 
            className="btn btn-primary" 
            value="Login" 
          />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    );
};


Login.prototype = {
  // since login is now in this format - we can deconstruct it when passing it thru this component
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool // now that isAuthenticated is added - it must also pass thru this component
} 

const mapStateToProps = state => ({
  // state.auth will give us everything however all we need is the  isAuthenticated variable
  isAuthenticated: state.auth.isAuthenticated
});

// connected to prop login..
export default connect(mapStateToProps, { login })(Login);

