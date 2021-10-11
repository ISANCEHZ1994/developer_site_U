import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

// import axios from 'axios';

const Register = () => {
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

    // this would've been for only the NAME! 
    // const changeName = e => setFormData({...formData, name: e.target.value}); 

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            console.log("Passwords do not match!");
        } else {
            console.log(formData, "SUCCESSFUL")


            // BELOW is an example of how to create a new user!!
        //    const newUser = {
        //        name,
        //        email,
        //        password
        //    };

        //    try {
        //        const config = {
        //            headers: {
        //                'Content-Type' : 'application/json'
        //            }
        //        };

        //        const body = JSON.stringify(newUser);

        //        // the string below will lead to our API Routes!
        //        const res = await axios.post('/api/users', body, config);
        //        console.log(res.data);

        //    } catch (err) {
        //        console.error(err.response.data);
        //    };
        };
    };
    
    return(
    <Fragment>
    
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
            {/* the input below: the onChange property is using a function with the same name */}
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={ name } 
            onChange={ (e) => onChange(e) }
            required
          />
          {/* {console.log(name)} */}
          {/* {console.log(email)} */}
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

export default Register;
