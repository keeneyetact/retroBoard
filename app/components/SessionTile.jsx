import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Component from '../Component';
import style from './SessionTile.scss';
import ClassNames from 'classnames';
import translate from '../i18n/Translate';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { default as Button } from 'react-toolbox/lib/button';

const stateToProps = state => ({ });

const actionsToProps = dispatch => ({});

@translate('SessionTile')
@translate('SessionName')
@connect(stateToProps, actionsToProps)
class SessionTile extends Component {
    renderLastJoined (lastJoined) {
        const MINUTE = 60 * 1000;
        const HOUR = 60 * MINUTE;
        const DAY = HOUR * 24;

        let diff = Date.now() - lastJoined;
        let days = Math.floor(diff / DAY);
        let hours = Math.floor((diff - (days * DAY)) / HOUR);
        let minutes = Math.floor((diff - (days * DAY) - (hours * HOUR))/ MINUTE);
        return this.props.strings.lastJoined.replace('${days}', days).replace('${hours}', hours).replace('${minutes}', minutes)

    }
    render() {

        return (
            <div className={ClassNames('col-4-12', 'mobile-col-1-2', style.sessionTile)}>
                <Card>
                    <CardTitle title={ this.props.session.name || this.props.strings.defaultSessionName } subtitle={this.renderLastJoined(this.props.session.lastJoin)} />
                    <CardActions>
                        {this.props.children}
                    </CardActions>
                </Card>
            </div>
        )
    }
}

SessionTile.propTypes = {
    session: PropTypes.object.isRequired,
    strings: PropTypes.object
}

SessionTile.defaultProps = {
    session: null,
    strings: {
        defaultSessionName: 'My Retrospective',
        lastJoined: '${days} day(s), ${hours} hours and ${minutes} minutes ago'
    }

}

export default SessionTile;