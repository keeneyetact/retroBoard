import { PropTypes } from 'react';
import Component from '../Component';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import noop from 'lodash/noop';
import translate from '../i18n/Translate';
import { connect } from 'react-redux';
import { getSortedWellPosts, getSortedNotWellPosts, getSortedIdeasPosts } from '../selectors';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import style from './SummaryBoard.scss';

const stateToProps = state => ({
    wellPosts: getSortedWellPosts(state),
    notWellPosts: getSortedNotWellPosts(state),
    ideasPosts: getSortedIdeasPosts(state)
});

const actionsToProps = dispatch => ({
});

@translate('PostBoard')
@translate('Post')
@connect(stateToProps, actionsToProps)
class SummaryBoard extends Component {
    render() {
        const { wellPosts, notWellPosts, ideasPosts, strings } = this.props;
        return (
            <div className={style.summary}>
                { this.renderType(strings.wellQuestion, style.well, wellPosts) }
                { this.renderType(strings.notWellQuestion, style.notWell, notWellPosts) }
                { this.renderType(strings.ideasQuestion, style.ideas, ideasPosts) }
            </div>
        );
    }

    renderType(label, className, posts) {
        if (!posts.length) {
            return null;
        }
        return (
            <div style={{ margin: 30 }}>
                <Card>
                    <CardTitle className={className}>{ label }</CardTitle>
                    <CardText>
                        <ul style={{ marginLeft: 0, marginTop: 20, listStyleType: 'none'}}>
                            { posts.map(this.renderPost.bind(this)) }
                        </ul>
                    </CardText>
                </Card>
            </div>
        );
    }

    renderPost(post) {
        const votes = post.likes.length;
        const { strings } = this.props;
        const subtitle = votes > 1 ? votes + ' ' + strings.votes : votes + ' ' + strings.vote;
        return (
            <li><span className={style.like}>+{post.likes.length}</span>&#9;<span className={style.dislike}>-{post.dislikes.length}</span>&#9;{post.content}</li>
        );
    }
}

SummaryBoard.propTypes = {
    wellPosts: PropTypes.array.isRequired,
    notWellPosts: PropTypes.array.isRequired,
    ideasPosts: PropTypes.array.isRequired,
    strings: PropTypes.object
}

SummaryBoard.defaultProps = {
    wellPosts: [],
    notWellPosts: [],
    ideasPosts: [],
    strings: {
        notWellQuestion: 'What could be improved?',
        wellQuestion: 'What went well?',
        ideasQuestion: 'A brilliant idea to share?',
        vote: 'vote',
        votes: 'votes'
    }
}

export default SummaryBoard;
