import axios from 'axios';
import { setAlert } from './alert';
import { 
    GET_PROFILE,
    GET_PROFILES,    
    PROFILE_ERROR, 
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,    
    GET_REPOS
 } from './types';
// To double check on routes go to backend ROUTES/API profile.js file

// Get Current User Information - Profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        console.log(res.data);
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    };
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE }); // whenever they go to profile list - we want to clear whatever's in the current profile
    try {
        const res = await axios.get('/api/profile');        
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        }); 
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    };
};

// Get profile BY ID
export const getProfileById = userId => async dispatch => {        
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }); 
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    };
};

// Get GitHub repos
export const getGitHubRepos = username => async dispatch => {    
    try {
        const res = await axios.get(`/api/profile/github/${username}`);        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        }); 
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    };
};

// Create/Update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }; 
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert( edit ? 'Profile Updated' : "Profile Created", 'success' ));
        // if we're creating it - we want to redirect!
        if(!edit){
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if( errors ){
            errors.forEach( 
                error =>  dispatch( setAlert(error.msg, 'danger') )
            );
        };
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });        
    }
};

// ADD EXPERIENCE
export const addExperience = ( formData, history ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }; 
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert( "Experience ADDED", 'success' ));        
        history.push('/dashboard');        
    } catch (error) {
        const errors = error.response.data.errors;
        if( errors ){
            errors.forEach( 
                error =>  dispatch( setAlert(error.msg, 'danger') )
            );
        };
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg:    error.response.statusText, 
                status: error.response.status 
            }
        });        
    };
};

// ADD EDUCATION
export const addEducation = ( formData, history ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }; 
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert( "Education ADDED", 'success' ));        
        history.push('/dashboard');        
    } catch (error) {
        const errors = error.response.data.errors;
        if( errors ){
            errors.forEach( 
                error =>  dispatch( setAlert(error.msg, 'danger') )
            );
        };
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg:    error.response.statusText, 
                status: error.response.status 
            }
        });        
    };
};

// Reminder of api end point: ROUTES/API profile.js should be line: 238
// DELETE EXPERIENCE
export const deleteExperience = (id) => async dispatch => {
    try {        
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });  
        dispatch( setAlert('Experience TERMINATED', 'success') );
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg:    error.response.statusText, 
                status: error.response.status
            }
        });
    };
};

// Reminder of api end point: ROUTES/API profile.js should be line: 313
// DELETE EDUCATION
export const deleteEducation = (id) => async dispatch => {
    try {        
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });  
        dispatch( setAlert('Education TERMINATED', 'success') );
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg:    error.response.statusText, 
                status: error.response.status 
            }
        });
    };
};

// DELETE ACCOUNT & PROFILE
export const deleteAccount = () => async dispatch => {
    if( window.confirm('The following action CANNOT be undone..ARE YOU SURE?' )){
        try {
            await axios.delete(`/api/profile`);
            dispatch({ type: CLEAR_PROFILE });  
            dispatch({ type: ACCOUNT_DELETED });
            dispatch( setAlert('YOUR ACCOUNT HAS CEASED TO EXIST - GGs') );  

        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { 
                    msg:    error.response.statusText, 
                    status: error.response.status 
                }
            });
        };
    };
};