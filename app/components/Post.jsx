import { default as React, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import style from './PostBoardStyle';

class Post extends React.Component {
    render() {
        return (
            <div className={ClassNames(style.post, style[this.props.type])}>
                <Card style={{width: '350px' }} raised className={style[this.props.type]}>
                    <CardText>{this.props.content}</CardText>
                    <CardActions>
                        <Button label="Up vote" />
                        <Button label="Down vote" />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

Post.propTypes = {
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

Post.defaultProps = {
    content: '',
    type: 'well'
}

export default Post;
