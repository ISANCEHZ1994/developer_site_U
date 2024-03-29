import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import { connect } from 'react-redux';
import { getGitHubRepos } from '../../Actions/profile';

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {

    useEffect(() => {
        getGitHubRepos(username);
    }, [ getGitHubRepos ]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">GitHub Repos</h2>
            { repos === null ? <Spinner/> : (
               repos.map( repo => (
                   <div key={repo._id}id={repo._id} className="repo bg-white p-1 my-1">                       
                       <div>
                           <h4>
                               <a href={ repo.html_url } target="_blank" rel='noopener'>{ repo.name }</a>
                            </h4>
                            <p> { repo.description }</p>
                       </div>
                       <div>
                           <ul>
                               <li className="badge badge-primary">Stars: { repo.stargazers_count } </li>
                               <li className='badge badge-dark'>Watchers: { repo.watchers_count }   </li>
                               <li className='badge badge-light'>Forks:   { repo.forks_count }      </li>
                           </ul>                          
                       </div>
                   </div>
               ))
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub);
