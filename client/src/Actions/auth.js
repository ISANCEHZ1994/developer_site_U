import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
// using below to loop thru the errors if any
import { setAlert } from './alert';

// Register User
export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    // preparing data to send
    const body = JSON.stringify({ name, email, password });

    try {
        // we are making a post request that takes in the end point, body and config
        const res = await axios.post('/api/users', body, config);
        // if above is successful we want to dispatch action 
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data // here is the token returning!
        });
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

