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
                    <CardTitle
                        avatar={this.getGravatar()}
                        title={post.user}
                    />
                    <CardText>{post.content}</CardText>
                    <CardActions>

                        { this.renderButtons() }
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderButtons(){
        if (this.props.currentUser === this.props.post.user) {
            return <IconButton icon="delete" floating mini style={{ backgroundColor: 'red', color: 'white' }} onClick={() => this.props.onDelete(this.props.post)} />;
        } else {
            return (
                <span>
                    <IconButton icon="thumb_up" floating mini style={{ backgroundColor: 'green', color: 'white' }} />
                    <IconButton icon="thumb_down" floating mini style={{ backgroundColor: 'red', color: 'white' }}  />
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
    onDelete: PropTypes.func
}

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: () => {}
}

export default Post;
