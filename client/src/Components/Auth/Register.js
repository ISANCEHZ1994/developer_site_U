import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// we want to call our created function setAlert from our actions folder so we must import
// whenever we want to use an action we have to pass it thru connect()() at the bottom 
import { setAlert } from '../../Actions/alert';
// be careful of naming conventions also added to connect at the bottom 
import { register } from '../../Actions/auth';
import PropTypes from 'prop-types';

// now that we passed the action from connnect()() we can now use props.setAlert to actually use it in this component
// destructered it! so now we just use setAlert();
const Register = ({ setAlert, register, isAuthenticated }) => {

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // instead of typing formData.name or formData.email - just name or email 
    const { name, email, password, password2 } = formData;

    // we want to keep all other items the same expect for the specifc NAME OF THE INPUT we are changing
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
          // instead of passing props to the function component pass it destructured! 
          // props.setAlert("Passwords do NOT match", 'danger'); 
          setAlert("Passwords do NOT match", 'danger'); 
          // the alertType is 'danger' => .alert-danger css you can check inside of App.css
          // comes from ACTIONS folder (alert.js) take takes in two arguments
          console.log('REGISTERATION FAIL!');
        } else {
          // we are able to get these variables because remember we destructered it above!
          register({ name, email, password });
          console.log(formData, "SUCCESS");          
        };
    };

    if(isAuthenticated){
      return <Redirect to="/dashboard"/>
    }
    
    return(
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={ e => onSubmit(e) }>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={ name }
            onChange={ (e) => onChange(e) }
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={ (e) => onChange(e) }
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={ password }
            onChange={ (e) => onChange(e) }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={ password2 }
            onChange={ (e) => onChange(e) }
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Register"
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
   </Fragment>
    );    
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  // state.auth will give us everything however all we need is the  isAuthenticated variable
  isAuthenticated: state.auth.isAuthenticated
});

// using connect()() from redux
// whenever we want to use an action we have to pass it thru connect
// connect()() takes in two arguements: any state that you want to map, and object with any actions you want to use
export default connect( mapStateToProps, { setAlert, register } )(Register);
