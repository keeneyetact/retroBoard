import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import translate from '../i18n/Translate';
import { connect } from 'react-redux';
import Snackbar from 'react-toolbox/lib/snackbar';
import PostBoard from '../components/PostBoard';
import SummaryBoard from '../components/SummaryBoard';
import SessionName from '../components/SessionName';
import { autoJoin } from '../state/session';
import { getSummaryMode } from '../selectors';
import icons from '../constants/icons';

const stateToProps = state => ({
    summaryMode: getSummaryMode(state)
});

const actionsToProps = dispatch => ({
    autoJoin: sessionId => dispatch(autoJoin(sessionId))
});

@connect(stateToProps, actionsToProps)
@translate('Main')
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { snackBarActive: false };
        this.mounted = false;
    }

    componentWillMount() {
        this.setState({ snackBarActive: true });
    }

    componentDidMount() {
        this.props.autoJoin(this.props.params.sessionId);
        this.mounted = true;
    }

    componentWillUnmount() {
        this.setState({ snackBarActive: false });
        this.mounted = false;
    }

    render() {
        const { summaryMode, strings } = this.props;
        const hideSnackbar = () => {
            if (this.mounted) {
                this.setState({ snackBarActive: false });
            }
        };
        return (
            <div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <SessionName />
                </div>
                { summaryMode ? <SummaryBoard /> : <PostBoard /> }
                <Snackbar
                  action="Ok!"
                  icon={ icons.question_answer }
                  label={strings.hint}
                  type="accept"
                  active={this.state.snackBarActive}
                  timeout={10000}
                  onClick={hideSnackbar}
                  onTimeout={hideSnackbar}
                />
            </div>
        );
    }
}

Main.propTypes = {
    autoJoin: PropTypes.func,
    summaryMode: PropTypes.bool,
    strings: PropTypes.object,
    params: PropTypes.object
};

Main.defaultProps = {
    autoJoin: noop,
    summaryMode: false,
    strings: {
        hint: 'You can invite others to this session by copy-pasting the URL'
    }
};

export default Main;
