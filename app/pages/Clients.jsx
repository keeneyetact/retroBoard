import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import md5 from 'md5';
import icons from '../constants/icons';

class Clients extends Component {
    render() {
        return (
            <List selectable ripple>
                <ListSubHeader caption='Kindly joining us right now:' />

                { this.props.clients.map(this.renderClient.bind(this)) }
              </List>
        )
    }

    renderClient(client) {
        return (
            <ListItem
              key={client}
              avatar={this.getGravatar(client)}
              caption={client}
              rightIcon={icons.person}
            />
        );
    }

    getGravatar(client) {
        return 'https://www.gravatar.com/avatar/'+md5(client)+'?d=retro';
    }
}

const stateToProps = state => ({
    clients: state.session.clients
});

export default connect(stateToProps)(Clients);
