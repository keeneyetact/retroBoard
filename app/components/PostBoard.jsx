import { default as React, PropTypes } from 'react';
import PostColumn from './PostColumn';
import style from './PostBoard.scss';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { addPost, deletePost, like, unlike } from '../state/posts';

class PostBoard extends React.Component {
    render() {
        const types = [ {
            type: 'well',
            question: 'What went well?',
            icon: 'sentiment_satisfied'
        },{
            type: 'notWell',
            question: 'What could be improved?',
            icon: 'sentiment_very_dissatisfied'
        },{
            type: 'ideas',
            question: 'A brilliant idea to share?',
            icon: 'lightbulb_outline'
        }];

        const notWell = this.props.posts.filter(p => p.postType === 'notWell');
        const well = this.props.posts.filter(p => p.postType === 'well');
        const improve = this.props.posts.filter(p => p.postType === 'improve');

        return (
            <div className={ClassNames(style.board, 'grid')}>
                { types.map(this.renderColumn.bind(this)) }
            </div>
        )
    }

    renderColumn(postType) {
        const posts = this.props.posts.filter(p => p.postType === postType.type);
        return (
            <div className={ClassNames(style.column, style[postType.type], 'col-4-12')}>
                <PostColumn
                    currentUser={this.props.currentUser}
                    posts={posts}
                    type={postType.type}
                    icon={postType.icon}
                    onAdd={this.props.addPost}
                    placeholder={postType.question}
                    onDelete={this.props.deletePost}
                    onLike={this.props.like}
                    onUnlike={this.props.unlike} />
            </div>
        );
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
