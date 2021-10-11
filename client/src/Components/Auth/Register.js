import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../Actions/alert';
// import axios from 'axios';

const Register = ({ setAlert }) => {
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
            // the alertType is 'danger' => .alert-danger css
            // will be the message that gets passed to function inside of alert.js/Actions
        } else {
            console.log(formData, "SUCCESS");

        };
    };
    
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
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={ email } 
            onChange={ (e) => onChange(e) }
            required 
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={ password }
            onChange={ (e) => onChange(e) }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={ password2 }
            onChange={ (e) => onChange(e) }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
   
   </Fragment>
    );    
};

export default connect(null, { setAlert })(Register);
