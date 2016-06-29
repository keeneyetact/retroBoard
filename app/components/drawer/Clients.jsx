import { connect } from 'react-redux';
import flow from 'lodash/flow';
import React, { PropTypes, Component } from 'react';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import md5 from 'md5';
import icons from '../../constants/icons';
import translate from '../../i18n/Translate';
import { getClients } from '../../selectors';

const stateToProps = state => ({
    clients: getClients(state)
});

class Clients extends Component {
    constructor(props) {
        super(props);
        this.renderClient = this.renderClient.bind(this);
    }

    getGravatar(client) {
        return `https://www.gravatar.com/avatar/${md5(client)}?d=retro`;
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

    render() {
        return (
            <List selectable ripple>
                <ListSubHeader caption={this.props.strings.header} />
                { this.props.clients.map(this.renderClient) }
            </List>
        );
    }
}

Clients.propTypes = {
    clients: PropTypes.array,
    strings: PropTypes.object
};

Clients.defaultProps = {
    clients: [],
    strings: {
        header: 'Kindly joining us right nowxx:'
    }
};

const decorators = flow([
    connect(stateToProps),
    translate('Clients')
]);

export default decorators(Clients);
