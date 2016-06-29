import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import { default as Button } from 'react-toolbox/lib/button';
import EditableLabel from '../EditableLabel';
import classNames from 'classnames';
import style from './Post.scss';
import icons from '../../constants/icons';
import translate from '../../i18n/Translate';

class Post extends Component {
    canVote() {
        return this.props.post.likes.indexOf(this.props.currentUser) === -1 &&
               this.props.post.dislikes.indexOf(this.props.currentUser) === -1 &&
               this.props.currentUser !== this.props.post.user;
    }

    canEdit() {
        return this.props.currentUser === this.props.post.user;
    }

    renderDelete() {
        const { post, strings } = this.props;
        if (this.props.currentUser === post.user) {
            return (
                <Button
                  icon={ icons.delete_forever }
                  label={ strings.deleteButton }
                  raised
                  className={ style.deleteButton }
                  onClick={ () => this.props.onDelete(post) }
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

    renderContent(post) {
        const editMode = this.state.editMode;
        if (editMode) {
            return (
                <div>
                    <input
                      value={post.content}
                      onBlur={() => this.disableEdit()}
                      onChange={(e) => this.props.onEdit(post, e.target.value)}
                    />
                </div>
            );
        }

        return post.content;
    }

    render() {
        const { post, strings } = this.props;
        return (
            <div className={classNames(style.post, style[post.postType])}>
                <Card raised className={style.card}>
                    <CardText>
                        <EditableLabel
                          value={post.content}
                          readOnly={!this.canEdit()}
                          placeholder={strings.noContent}
                          onChange={v => this.props.onEdit(post, v)}
                        />
                    </CardText>
                    <CardActions>
                        <div className={style.actions}>
                            { this.renderButton('likes',
                                icons.thumb_up,
                                style.like,
                                () => this.props.onLike(post)) }
                            { this.renderButton('dislikes',
                                icons.thumb_down,
                                style.dislike,
                                () => this.props.onUnlike(post)) }
                            { this.renderDelete() }
                        </div>
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
    onEdit: PropTypes.func,
    strings: PropTypes.object
};

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop,
    onEdit: noop,
    strings: {
        deleteButton: 'Delete',
        noContent: '(This post has no content)'
    }
};

const decorators = flow([
    translate('Post')
]);

export default decorators(Post);
