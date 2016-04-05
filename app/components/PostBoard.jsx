import { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import PostColumn from './PostColumn';
import style from './PostBoard.scss';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { addPost, deletePost, like, unlike } from '../state/posts';
import icons from '../constants/icons';
import translate from '../i18n/Translate';
import { getWellPosts, getNotWellPosts, getIdeasPosts, getCurrentUser } from '../selectors';
import Snackbar from 'react-toolbox/lib/snackbar'

const stateToProps = state => ({
    currentUser: getCurrentUser(state),
    wellPosts: getWellPosts(state),
    notWellPosts: getNotWellPosts(state),
    ideasPosts: getIdeasPosts(state)
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
        this.state = { snackBarActive: false };
    }

    render() {
        const { strings, wellPosts, notWellPosts, ideasPosts } = this.props;
        const types = [{
            type: 'well',
            question: strings.wellQuestion,
            icon: icons.sentiment_satisfied,
            posts: wellPosts
        },{
            type: 'notWell',
            question: strings.notWellQuestion,
            icon: icons.sentiment_very_dissatisfied,
            posts: notWellPosts
        },{
            type: 'ideas',
            question: strings.ideasQuestion,
            icon: icons.lightbulb_outline,
            posts: ideasPosts
        }];
        const hideSnackbar = () => this.setState({ snackBarActive: false });

        return (
            <div className={ClassNames(style.board, 'grid')}>
                { types.map(this.renderColumn) }

                <Snackbar
                    action='Ok!'
                    icon='question_answer'
                    label={strings.hint}
                    type='accept'
                    active={this.state.snackBarActive}
                    timeout={10000}
                    onClick={hideSnackbar}
                    onTimeout={hideSnackbar}
                />
            </div>
        )
    }

    renderColumn(postType, index) {
        return (
            <div className={ClassNames(style.column, style[postType.type], 'col-4-12')} key={postType.type}>
                <PostColumn
                    currentUser={this.props.currentUser}
                    posts={postType.posts}
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

    componentDidMount() {
        this.setState({snackBarActive: true})
    }
}

PostBoard.propTypes = {
    currentUser: PropTypes.string,
    wellPosts: PropTypes.array.isRequired,
    notWellPosts: PropTypes.array.isRequired,
    ideasPosts: PropTypes.array.isRequired,
    addPost: PropTypes.func,
    deletePost: PropTypes.func,
    strings: PropTypes.object
}

PostBoard.defaultProps = {
    currentUser: null,
    wellPosts: [],
    notWellPosts: [],
    ideasPosts: [],
    addPost: noop,
    deletePost: noop,
    strings: {
        notWellQuestion: 'What could be improved?',
        wellQuestion: 'What went well?',
        ideasQuestion: 'A brilliant idea to share?',
        hint: 'You can share invite others to this session by copy-pasting the URL'
    }
}

export default PostBoard;
