// a function created to check for token by taking it in 
// if token there - ADD it to header
// if NOT delete token..

import axios from 'axios' // adding global header..not really fetching

// its going to check from localStorage (broswer)
const setAuthToken = token => {
    if(token){
        // the header we want to set is [<'HERE'>]
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;

