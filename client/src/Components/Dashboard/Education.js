import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// using Moment to format Dates - so that they appear readable
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../Actions/profile';

const Education = ({ education, deleteEducation }) => {

  // education and experience done differently to show work
  return (
    <Fragment>
        <h2 className="my-2">Education Credientials</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Actions</th>
                </tr>
            </thead>
            <tbody>
                { education.map( edu => (                    
                    <tr key={ edu._id }>
                        <td>{ edu.school }</td>
                        <td className='hide-sm'>{ edu.degree }</td> 
                        <td>
                            <Moment format='YYYY/MM/DD'>{ edu.from }</Moment> -{' '} 
                            {
                                edu.to === null ? ("Present") : (<Moment format='YYYY/MM/DD'>{ edu.to }</Moment>)
                            } 
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={ () => deleteEducation(edu._id) }>Delete</button>
                        </td> 
                    </tr>
                ))}              
            </tbody>
        </table>
    </Fragment>
  );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
