import { default as React, PropTypes } from 'react';
import PostColumn from './PostColumn';
import style from './PostBoardStyle';
import ClassNames from 'classnames';

class PostBoard extends React.Component {
    render() {

        const notWell = this.props.posts.filter(p => p.postType === 'notWell');
        const well = this.props.posts.filter(p => p.postType === 'well');
        const improve = this.props.posts.filter(p => p.postType === 'improve');

        return (
            <div className={style.board}>
                <div className={ClassNames(style.column, style.notWell)}>
                    <PostColumn currentUser={this.props.currentUser} posts={notWell} type={'notWell'} onAdd={this.props.onAdd} placeholder="What didn't go well?" onDelete={this.props.onDelete} />
                </div>
                <div className={ClassNames(style.column, style.well)}>
                    <PostColumn currentUser={this.props.currentUser} posts={well} type={'well'} onAdd={this.props.onAdd} placeholder="What did go well?" onDelete={this.props.onDelete} />
                </div>
                <div className={ClassNames(style.column, style.improve)}>
                    <PostColumn currentUser={this.props.currentUser} posts={improve} type={'improve'} onAdd={this.props.onAdd} placeholder="Something to improve?" onDelete={this.props.onDelete} />
                </div>
            </div>

        )
    }
}

PostBoard.propTypes = {
    currentUser: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func
}

PostBoard.defaultProps = {
    currentUser: null,
    posts: {
        well: [],
        notWell: [],
        improve: []
    },
    onAdd: () => {},
    onDelete: () => {}
}

export default PostBoard;
