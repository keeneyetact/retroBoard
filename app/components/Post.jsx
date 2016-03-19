import { default as React, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {IconButton} from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import style from './PostBoardStyle';
import md5 from 'md5';

class Post extends React.Component {
    render() {
        return (
            <div className={ClassNames(style.post, style[this.props.type])}>
                <Card style={{width: '350px' }} raised className={style[this.props.type]}>
                    <CardTitle
                        avatar={this.getGravatar()}
                        title={this.props.user}
                    />
                    <CardText>{this.props.content}</CardText>
                    <CardActions>
                        <IconButton icon="thumb_up" floating mini style={{ backgroundColor: 'green', color: 'white' }} />
                        <IconButton icon="thumb_down" floating mini style={{ backgroundColor: 'red', color: 'white' }}  />
                        { this.renderDeleteButton() }
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderDeleteButton(){
        if (this.props.currentUser === this.props.user) {
            return <IconButton icon="delete" floating mini style={{ backgroundColor: 'red', color: 'white' }} onClick={() => this.props.onDelete(this.props.postId)} />;
        }

        return null;
    }

    getGravatar() {
        return 'https://www.gravatar.com/avatar/'+md5(this.props.user)+'?d=retro';
    }
}

Post.propTypes = {
    currentUser: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onDelete: PropTypes.func
}

Post.defaultProps = {
    currentUser: null,
    user: '',
    content: '',
    postId: null,
    type: 'well',
    onDelete: () => {}
}

export default Post;
