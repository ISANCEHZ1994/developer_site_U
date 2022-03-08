import { REMOVE_ALERT, SET_ALERT } from "./types";
import { v4 as uuidv4 } from 'uuid';

// we want to be able to dispatch more than one action.type so we add [ => dispatch => ] 
// setAlert is what will be called on the front page then from here it will follow along with the programs
export const setAlert = ( msg, alertType ) => dispatch => {

    const id = uuidv4(); // will give us a long string ID

    // below we are calling our setAlert that's in the REDUCER - the type is SET_ALERT
    // will also need the payload because that's what we are asking to be returned
    // this object above represents what will go inside of the initalstate array inside alert.js/reducer
    /* 
    ***INSIDE of alert.js/reducer***
     case SET_ALERT:
            return [ ...state, payload ];
    */
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // setTimeOut() is a funtion that takes in a function
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 6000);
    // if we look back into our alert.js reducers 
    // we can see that the payload id will match with the alert id and remove it from the array - filter()   

};

