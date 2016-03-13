import { default as React, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import RTB from 'react-toolbox';
import Button from 'react-toolbox/lib/button';

class HelloWorld extends React.Component {
    render() {
        return (
            <Card style={{width: '350px'}}>
                <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title="Avatar style title"
                    subtitle="Subtitle here"
                />
                <CardMedia
                    aspectRatio="wide"
                    image="https://placeimg.com/800/450/nature"
                />
                <CardTitle
                    title="Title goes here and here"
                    subtitle="Subtitle here"
                />
                <CardText>Gnark</CardText>
                <CardActions>
                    <Button label="Action 1" />
                    <Button label="Action 2" />
                </CardActions>
            </Card>
        )
    }
}

export default HelloWorld;
