import { default as React, PropTypes } from 'react';
import PostColumn from './PostColumn';
import style from './PostBoardStyle';
import ClassNames from 'classnames';

class PostBoard extends React.Component {
    render() {
        return (
            <div className={style.board}>
                <div className={ClassNames(style.column, style.notWell)}>
                    <PostColumn posts={this.props.posts.notWell} type={'notWell'} />
                </div>
                <div className={ClassNames(style.column, style.well)}>
                    <PostColumn posts={this.props.posts.well} type={'well'} />
                </div>
                <div className={ClassNames(style.column, style.improve)}>
                    <PostColumn posts={this.props.posts.improve} type={'improve'} />
                </div>
            </div>

        )
    }
}

PostBoard.propTypes = {
    posts: PropTypes.object.isRequired
}

PostBoard.defaultProps = {
    posts: {
        well: [],
        notWell: [],
        improve: []
    }
}

export default PostBoard;
