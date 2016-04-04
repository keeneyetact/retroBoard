import { PropTypes } from 'react';
import Component from '../Component';
import PostColumn from './PostColumn';
import style from './PostBoard.scss';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { addPost, deletePost, like, unlike } from '../state/posts';
import icons from '../constants/icons';
import translate from '../i18n/Translate';

const stateToProps = state => ({
    currentUser: state.user.name,
    posts: state.posts
});

const actionsToProps = dispatch => ({
    addPost: (type, text) => dispatch(addPost(type, text)),
    deletePost: post => dispatch(deletePost(post)),
    like: post => dispatch(like(post)),
    unlike: post => dispatch(unlike(post))
});

@translate('PostBoard')
@connect(stateToProps, actionsToProps)
class PostBoard extends Component {
    constructor(props) {
        super(props);
        this.renderColumn = this.renderColumn.bind(this);
    }

    render() {
        const { strings } = this.props;
        const types = [{
            type: 'well',
            question: strings.wellQuestion,
            icon: icons.sentiment_satisfied
        },{
            type: 'notWell',
            question: strings.notWellQuestion,
            icon: icons.sentiment_very_dissatisfied
        },{
            type: 'ideas',
            question: strings.ideasQuestion,
            icon: icons.lightbulb_outline
        }];

        return (
            <div className={ClassNames(style.board, 'grid')}>
                { types.map(this.renderColumn) }
            </div>
        )
    }

    renderColumn(postType, index) {
        const posts = this.props.posts.filter(p => p.postType === postType.type);
        return (
            <div className={ClassNames(style.column, style[postType.type], 'col-4-12')} key={postType.type}>
                <PostColumn
                    currentUser={this.props.currentUser}
                    posts={posts}
                    type={postType.type}
                    icon={postType.icon}
                    onAdd={this.props.addPost}
                    placeholder={postType.question}
                    onDelete={this.props.deletePost}
                    onLike={this.props.like}
                    onUnlike={this.props.unlike} />
            </div>
        );
    }
}

PostBoard.propTypes = {
    currentUser: PropTypes.string,
    posts: PropTypes.array.isRequired,
    addPost: PropTypes.func,
    deletePost: PropTypes.func,
    strings: PropTypes.object
}

PostBoard.defaultProps = {
    currentUser: null,
    posts: [],
    addPost: () => {},
    deletePost: () => {},
    strings: {
        notWellQuestion: 'What could be improved?',
        wellQuestion: 'What went well?',
        ideasQuestion: 'A brilliant idea to share?'
    }
}

export default PostBoard;
