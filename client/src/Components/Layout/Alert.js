import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => // since we are only using one expression we don't need the curly boys {}
    alerts !== null && // making sure it is not null
        alerts.length > 0 &&  // making sure that there is something inside the array
            alerts.map( alert => ( 
                <div key={ alert.id } className={`alert alert-${ alert.alertType }`}>
                    { alert.msg }
                </div>
                )
            );

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

// we want to get the alert state seen from the dev tool browser redux section (that whole array of ojects)
const mapStateToProps = state => ({
    alerts: state.alert // state.alert => the alert comes from the rootReducer - Reducer/index.js
    // the alerts key is taken above and passed thru the Alert function - destructured
});


export default connect(mapStateToProps)(Alert); 
