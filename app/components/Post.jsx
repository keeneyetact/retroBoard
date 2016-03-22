import { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { default as Button, IconButton} from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import style from './PostBoard.scss';
import icons from '../constants/icons';

class Post extends Component {
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
            return <Button icon={icons.delete_forever} label="Delete" flat primary style={{ backgroundColor: '#FF9494', color: 'white', tabIndex: -1 }} onClick={() => this.props.onDelete(post)} />;
        } else {
            return (
                <span>
                    <IconButton icon={icons.thumb_up} floating mini style={{ backgroundColor: '#6BD173', color: 'white' }}
                        onClick={() => this.props.onLike(post)} />
                    <IconButton icon={icons.thumb_down} floating mini style={{ backgroundColor: '#FF9494', color: 'white' }}
                        disabled={ post.votes <= 0 }
                        onClick={() => this.props.onUnlike(post)} />
                </span>
            );
        }

        return null;
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
