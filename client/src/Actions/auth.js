import axios from 'axios';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
// using below to loop thru the errors and show them if any
import { setAlert } from './alert';
import setAuthToken from '../Utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    // checking for token if there at all..created UTIL folder withsetAuthToken file inside!
    // NOTE: we also use this function inside of App.js because the function here only runs ONCE..
    if(localStorage.token){
        setAuthToken(localStorage.token); 
    };
    // we want to make our request
    try{
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type: AUTH_ERROR            
        })
    };
};

// login User
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }; 
    const body = JSON.stringify({ email, password });
    try {
        // we are making a post request that takes in the end point, body and config
        const res = await axios.post('/api/auth', body, config);
        // if above is successful we want to dispatch action 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // here is the token returning!
        });
        // as soon as passes everything we want to load that specfic user..as adding this to the Register User Below!
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if( errors ){
            errors.forEach( 
                error =>  dispatch( setAlert(error.msg, 'danger') )
            );
        };
        dispatch({
            type: LOGIN_FAIL // no payload because our reducer is not asking for it! check auth.js/Reducers folder
        });
    };
};


// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({ name, email, password });
    try {        
        const res = await axios.post('/api/users', body, config);  

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data // here is the token returning!
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if( errors ){
            errors.forEach( 
                error =>  dispatch( setAlert(error.msg, 'danger') )
            );
        };
        dispatch({
            type: REGISTER_FAIL // no payload because our reducer is not asking for it! check auth.js/Reducers folder
        });
    };
};

// Logout - technically clearing the localStorage
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });    
};


