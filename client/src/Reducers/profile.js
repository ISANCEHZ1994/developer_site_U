import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE } from '../Actions/types';

const initalState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default function(state = initalState, action){
     
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE: // basically we want to do the same as in return the data - requests and changes done in ACTION!
            return {
                ...state,
                profile: payload,
                loading: false
            };        
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        default: 
            return state;
    };

};