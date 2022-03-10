import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../Actions/profile';
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {

    useEffect( () => {
        getCurrentProfile();
    }, []);  

    return(
        <div>
            WE WANT WORK HERE!
        </div>
    );
};

Dashboard.propTypes = {
    // SHORTCUTS
    // ptro => PropTypes.object.isRequired
    // ptfr => PropTypes.func.isRequired
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapToStateProps = state => ({
    auth: state.auth,
    profile: state.profile
}); 

export default connect(mapToStateProps, { getCurrentProfile })(Dashboard);
