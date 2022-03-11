import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT    
} from "../Actions/types";

const initalState = {
    // we are using localStorage to save user data (store the token)
    // the token recieved from localStorage will be set to state where key 'token:' is
    token:           localStorage.getItem('token'),
    // when we make a request to register or login and it is successful we will change to true
    isAuthenticated: null, 
    // making sure that we already made a request to the backend and got a response => turn false (it's been loaded)
    loading:         true, 
    // will return a user's information when they register
    user:            null  
};

export default function(state = initalState, action){
    const { payload, type } = action;

    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
                // NOTE: if you check auth.js file in API we can see that we get all information EXCEPT password..
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // we if we have a success we get token back so we want user to be logged in right away
            // the token that is returned will be replacing whatever is inside localStorage
            localStorage.setItem('token', payload.token);
            return { 
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL: 
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:  
            // we want to remove anything that is in localStorage because of the fail
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false // even thought it failed it still finsihed loading
            }
        default:
            return state;
    };

};
