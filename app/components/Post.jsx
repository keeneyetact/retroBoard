import { default as React, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {IconButton} from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import style from './PostBoardStyle';
import md5 from 'md5';

class Post extends React.Component {
    render() {
        const post = this.props.post;
        return (
            <div className={ClassNames(style.post, style[post.postType])}>
                <Card style={{width: '350px' }} raised className={style[post.postType]}>
                    <CardText>{post.content}</CardText>
                    <CardActions>
                        { this.renderButtons() }
                        &nbsp;&nbsp;&nbsp;<b>{ this.props.post.votes }</b>&nbsp;{ this.props.post.votes > 1 ? 'votes': 'vote' }
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderButtons(){
        const post = this.props.post;
        if (this.props.currentUser === post.user) {
            return <IconButton icon="delete" floating mini style={{ backgroundColor: '#FF9494', color: 'white' }} onClick={() => this.props.onDelete(post)} />;
        } else {
            return (
                <span>
                    <IconButton icon="thumb_up" floating mini style={{ backgroundColor: '#6BD173', color: 'white' }}
                        onClick={() => this.props.onLike(post)} />
                    <IconButton icon="thumb_down" floating mini style={{ backgroundColor: '#FF9494', color: 'white' }}
                        disabled={ post.votes <= 0 }
                        onClick={() => this.props.onUnlike(post)} />
                </span>
            );
        }

        return null;
    }

    getGravatar() {
        return 'https://www.gravatar.com/avatar/'+md5(this.props.post.user)+'?d=retro';
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func
}

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: () => {},
    onLike: () => {},
    onUnlike: () => {}
}

export default Post;
