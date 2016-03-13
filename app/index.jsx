import { default as React, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class Index extends React.Component {
    render() {
        return (
            <div>
                <p>Main Page</p>
                <p><Button label="Hello World this is me" raised accent /></p>
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
         title="Title goes here"
         subtitle="Subtitle here"
       />
   <CardText>Gnark</CardText>
       <CardActions>
         <Button label="Action 1" />
         <Button label="Action 2" />
       </CardActions>
     </Card>
            </div>
        )
    }
}

export default Index;
