import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
// using Moment to format Dates - so that they appear readable
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {

    // experience and education done in different styles!
    const experiences = experience.map( exp =>  (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>  
            <td>            
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '} 
                {
                    exp.to === null ? ("Present") : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                } 
            </td>                     
            <td>
                 <button className='btn btn-danger'>Delete</button>
            </td> 
        </tr>              
    ));

  return (
    <Fragment>
        <h2 className="my-2">Experience Aquired</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className="hide-sm">Years</th>
                    <th className='hide-sm'>Actions</th>
                </tr>
            </thead>
            <tbody>
                { experiences }
            </tbody>
        </table>
    </Fragment>
  );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired
};

export default connect()(Experience);
