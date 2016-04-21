import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import Post from './Post';
import PostAdd from './PostAdd';
import icons from '../constants/icons';
import style from './PostBoard.scss';

class PostColumn extends Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
    }

    addPost(text) {
        this.props.onAdd(this.props.type, text);
    }

    render() {
        return (
            <div>
                <PostAdd
                  onAdd={this.addPost}
                  placeholder={this.props.placeholder}
                  icon={this.props.icon}
                />
                <div className={style.columnContent}>
                    { this.props.posts.map((post, index) =>
                        <Post
                          key={index}
                          currentUser={this.props.currentUser}
                          post={post}
                          onLike={this.props.onLike}
                          onUnlike={this.props.onUnlike}
                          onDelete={this.props.onDelete}
                        />
                    )}
                </div>
            </div>
        );
    }
}

PostColumn.propTypes = {
    currentUser: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func
};

PostColumn.defaultProps = {
    currentUser: null,
    posts: [],
    type: 'well',
    icon: icons.add_circle,
    placeholder: 'New Comment',
    onAdd: noop,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop
};

export default PostColumn;
