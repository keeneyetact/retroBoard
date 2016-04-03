import { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { default as Button, IconButton} from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import style from './PostBoard.scss';
import icons from '../constants/icons';
import translate from '../i18n/Translate';

@translate('Post')
class Post extends Component {
    render() {
        const { post, strings } = this.props;
        return (
            <div className={ClassNames(style.post, style[post.postType])}>
                <Card style={{width: '350px' }} raised className={style[post.postType]}>
                    <CardText>{post.content}</CardText>
                    <CardActions>
                        { this.renderButton('likes', icons.thumb_up, '#6BD173', () => this.props.onLike(post)) }
                        { this.renderButton('dislikes', icons.thumb_down, '#FF9494', () => this.props.onUnlike(post)) }
                        { this.renderDelete() }
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderDelete(){
        const { post, strings } = this.props;
        if (this.props.currentUser === post.user) {
            return <Button icon={icons.delete_forever} label={strings.deleteButton} raised style={{ backgroundColor: '#FF9494', color: 'white', tabIndex: -1 }} onClick={() => this.props.onDelete(post)} />;
        }

        return null;
    }

    renderButton(name, icon, color, onClick) {
        const votes = this.props.post[name].length;
        const label = votes ? votes : '-';
        return (
            <Button icon={icon} label={label} onClick={onClick} raised={this.canVote()} style={{ backgroundColor: color, color: 'white' }} disabled={!this.canVote()}/>
        );
    }

    canVote() {
        return this.props.post.likes.indexOf(this.props.currentUser) === -1 &&
               this.props.post.dislikes.indexOf(this.props.currentUser) === -1 &&
               this.props.currentUser !== this.props.post.user;
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    strings: PropTypes.object
}

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: () => {},
    onLike: () => {},
    onUnlike: () => {},
    strings: {
        deleteButton: 'Delete'
    }
}

export default Post;
