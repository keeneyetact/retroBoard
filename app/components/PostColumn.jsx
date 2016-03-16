import { default as React, PropTypes } from 'react';
import Post from './Post';

class PostColumn extends React.Component {
    render() {
        return (
            <div className="column-content">
                { this.props.posts.map((post, index) => <Post content={post.content} type={this.props.type} key={index} />)}
            </div>
        )
    }
}

PostColumn.propTypes = {
    posts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

PostColumn.defaultProps = {
    posts: [],
    type: 'well'
}

export default PostColumn;
