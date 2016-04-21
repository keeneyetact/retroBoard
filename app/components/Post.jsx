import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import { default as Button } from 'react-toolbox/lib/button';
import classNames from 'classnames';
import style from './PostBoard.scss';
import icons from '../constants/icons';
import translate from '../i18n/Translate';

@translate('Post')
class Post extends Component {
    canVote() {
        return this.props.post.likes.indexOf(this.props.currentUser) === -1 &&
               this.props.post.dislikes.indexOf(this.props.currentUser) === -1 &&
               this.props.currentUser !== this.props.post.user;
    }

    renderDelete() {
        const { post, strings } = this.props;
        if (this.props.currentUser === post.user) {
            return (
                <Button
                  icon={icons.delete_forever}
                  label={strings.deleteButton}
                  raised
                  className={style.deleteButton}
                  onClick={() => this.props.onDelete(post)}
                />
            );
        }

        return null;
    }

    renderButton(name, icon, className, onClick) {
        const canVote = this.canVote();
        const votes = this.props.post[name].length;
        const label = votes ? votes.toString() : '-';
        const classNameFinal = classNames(className, canVote ? null : style.disabled);
        const visible = canVote || votes > 0;

        if (!visible) {
            return null;
        }
        return (
            <Button
              icon={icon}
              label={label}
              onClick={onClick}
              raised={canVote}
              className={classNameFinal}
              disabled={!canVote}
            />
        );
    }

    render() {
        const { post } = this.props;
        return (
            <div className={classNames(style.post, style[post.postType])}>
                <Card style={{ width: '350px' }} raised className={style[post.postType]}>
                    <CardText>{post.content}</CardText>
                    <CardActions>
                        { this.renderButton('likes',
                            icons.thumb_up,
                            style.like,
                            () => this.props.onLike(post)) }
                        { this.renderButton('dislikes',
                            icons.thumb_down,
                            style.dislike,
                            () => this.props.onUnlike(post)) }
                        { this.renderDelete() }
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    strings: PropTypes.object
};

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop,
    strings: {
        deleteButton: 'Delete'
    }
};

export default Post;
