import React, { Fragment, useEffect } from 'react';
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../Actions/profile';
import { DashboardActions }  from './DashboardActions';
import Spinner      from '../Layout/Spinner';
import PropTypes    from 'prop-types';
import Experience   from './Experience';
import Education    from './Education';

const Dashboard = ({ 
    getCurrentProfile,
    deleteAccount, 
    auth: { user }, 
    profile:{ profile, loading } 
}) => {
    useEffect( () => {
        // the function below gives a warning on the browser console..react-hooks/exhaustive-deps
        getCurrentProfile(); // 
    },[ getCurrentProfile ]);  

    return loading && profile === null ? 
    ( <Spinner/> ) 
    : (
    <Fragment> 
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
             <i className="fas fa-user">Welcome { user && user.name } </i>  {/* if user exists then show user name */}            
        </p>
        { 
            profile !== null ? 
            ( 
            <Fragment>
                <DashboardActions />
                <Experience experience={ profile.experience }/>
                <Education  education={ profile.education }/>

                <div className="my-2">
                    <button className="btn btn-danger" onClick={ () => deleteAccount() }>
                        <i className="fas fa-user-minus"></i>Delete My Account
                    </button>
                </div>
            </Fragment> 
            ) 
            : (
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment>
            )
        }       
    </Fragment>
    );
};

Dashboard.propTypes = {
    // SHORTCUTS
    // ptro => PropTypes.object.isRequired
    // ptfr => PropTypes.func.isRequired
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapToStateProps = state => ({
    auth: state.auth,
    profile: state.profile
}); 

export default connect(mapToStateProps, { getCurrentProfile, deleteAccount })(Dashboard);
