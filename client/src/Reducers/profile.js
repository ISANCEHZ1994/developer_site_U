import { GET_PROFILE, PROFILE_ERROR } from '../Actions/types';

const initalState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default function(state = initalState, action){
    // console.log('action here from profile reducer => ', action );   

    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }          
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: 
            return state;
    };

};