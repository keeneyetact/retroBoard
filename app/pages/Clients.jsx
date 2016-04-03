import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import md5 from 'md5';
import icons from '../constants/icons';
import translate from '../i18n/Translate';

const stateToProps = state => ({
    clients: state.session.clients,
    lang: state.user.lang
});

@translate('Clients')
@connect(stateToProps)
class Clients extends Component {
    render() {
        return (
            <List selectable ripple>
                <ListSubHeader caption={this.props.strings.header} />

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

Clients.propTypes = {
    clients: PropTypes.array,
    strings: PropTypes.object
}

Clients.defaultProps = {
    clients: [],
    strings: {
        header: 'Kindly joining us right nowxx:'
    }
}

export default Clients;
