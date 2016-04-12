import { PropTypes } from 'react';
import Component from '../Component';
import style from './SessionTile.scss';
import ClassNames from 'classnames';
import translate from '../i18n/Translate';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import moment from 'moment';

@translate('SessionName')
class SessionTile extends Component {
    render() {
        const { session, strings, children } = this.props;
        const lastJoined = moment(session.lastJoin)
            .locale(this.props.currentLanguage.substr(0, 2))
            .fromNow();

        return (
            <div className={ClassNames('col-4-12', 'mobile-col-1-1', style.sessionTile)}>
                <Card>
                    <CardTitle title={ session.name || strings.defaultSessionName } subtitle={lastJoined} />
                    <CardActions>
                        {children}
                    </CardActions>
                </Card>
            </div>
        )
    }
}

SessionTile.propTypes = {
    session: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string,
    strings: PropTypes.object,
}

SessionTile.defaultProps = {
    session: null,
    currentLanguage: 'en',
    strings: {
        defaultSessionName: 'My Retrospective',
    }

}

export default SessionTile;
