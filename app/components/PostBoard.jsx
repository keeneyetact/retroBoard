import { default as React, PropTypes } from 'react';
import PostColumn from './PostColumn';
import style from './PostBoardStyle';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { addPost, deletePost, like, unlike } from '../state/posts';

class PostBoard extends React.Component {
    render() {

        const notWell = this.props.posts.filter(p => p.postType === 'notWell');
        const well = this.props.posts.filter(p => p.postType === 'well');
        const improve = this.props.posts.filter(p => p.postType === 'improve');

        return (
            <div className={style.board}>
                <div className={ClassNames(style.column, style.notWell)}>
                    <PostColumn currentUser={this.props.currentUser} posts={notWell} type={'notWell'} onAdd={this.props.addPost} placeholder="What didn't go well?" onDelete={this.props.deletePost} onLike={this.props.like} onUnlike={this.props.unlike} />
                </div>
                <div className={ClassNames(style.column, style.well)}>
                    <PostColumn currentUser={this.props.currentUser} posts={well} type={'well'} onAdd={this.props.addPost} placeholder="What did go well?" onDelete={this.props.deletePost} onLike={this.props.like} onUnlike={this.props.unlike} />
                </div>
                <div className={ClassNames(style.column, style.improve)}>
                    <PostColumn currentUser={this.props.currentUser} posts={improve} type={'improve'} onAdd={this.props.addPost} placeholder="Something to improve?" onDelete={this.props.deletePost} onLike={this.props.like} onUnlike={this.props.unlike} />
                </div>
            </div>

        )
    }
}

PostBoard.propTypes = {
    currentUser: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    addPost: PropTypes.func,
    deletePost: PropTypes.func
}

PostBoard.defaultProps = {
    currentUser: null,
    posts: [],
    addPost: () => {},
    deletePost: () => {}
}

const stateToProps = state => ({
    currentUser: state.user.name,
    posts: state.posts
});

const actionsToProps = dispatch => ({
    addPost: (type, text) => dispatch(addPost(type, text)),
    deletePost: post => dispatch(deletePost(post)),
    like: post => dispatch(like(post)),
    unlike: post => dispatch(unlike(post))
});

export default connect(stateToProps, actionsToProps)(PostBoard);
