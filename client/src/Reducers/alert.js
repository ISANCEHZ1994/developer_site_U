// a reducer is just a function that takes in a piece of state and an action
// the action will get dispatched from an ACTIONS file

import { SET_ALERT, REMOVE_ALERT } from '../Actions/types'; // only so that we don't use string items - making reference

const initalState = []; // this state will pertain to alerts 
// objects with an id, a message, alertType: 'success' <== something like this

export default function(state = initalState, action){ 
    
    const { type, payload } = action; // seperating the information inside of the action object

    switch (type){ // instead of action.type now just type
        case SET_ALERT:
            return [ ...state, payload ]; // this is what will be passed down to the component that called it
        case REMOVE_ALERT:
            return state.filter( alert => alert.id !== payload );
        default: 
            return state;
    };
};

