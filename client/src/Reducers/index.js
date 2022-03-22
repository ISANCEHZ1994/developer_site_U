import { combineReducers } from "redux";
import profile from './profile';
import alert from './alert';
import auth from "./auth";
import post from './post';

export default combineReducers({
    alert,
    auth,
    profile,
    post
});

