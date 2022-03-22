import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { connect } from 'react-redux';
import { getPost } from '../../Actions/post';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id);
    }, [ getPost ]);

    return (
        loading || post === null ? <Spinner/> 
        : 
        <Fragment>
            <Link to='/posts' className="btn">Back To Posts</Link>
            <PostItem post={ post } showActions={ false }/>
            <CommentForm postId={ post._id }/> 
            <div className="comments">
                { post.comments.map( comment => (
                    <CommentItem key={ comment._id } comment={ comment }/>
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
