import { default as React, PropTypes } from 'react';
import Post from './Post';
import PostAdd from './PostAdd';

class PostColumn extends React.Component {
    render() {
        return (
            <div>
                <PostAdd onAdd={this.addPost.bind(this)} placeholder={this.props.placeholder} icon={this.props.icon} />
                <div className="column-content">
                    { this.props.posts.map((post, index) =>
                        <Post key={index}
                              currentUser={this.props.currentUser}
                              post={post}
                              onLike={this.props.onLike}
                              onUnlike={this.props.onUnlike}
                              onDelete={this.props.onDelete} />
                    )}
                </div>
            </div>
        )
    }

    addPost (text) {
        this.props.onAdd(this.props.type, text);
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
}

PostColumn.defaultProps = {
    currentUser: null,
    posts: [],
    type: 'well',
    icon: 'add_circle',
    placeholder: 'New Comment',
    onAdd: () => {},
    onDelete: () => {},
    onLike: () => {},
    onUnlike: () => {}
}

export default PostColumn;
