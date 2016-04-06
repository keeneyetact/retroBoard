import { PropTypes } from 'react';
import noop from 'lodash/noop';
import Component from '../Component';
import translate from '../i18n/Translate';
import { connect } from 'react-redux';
import Snackbar from 'react-toolbox/lib/snackbar'
import PostBoard from '../components/PostBoard';
import SummaryBoard from '../components/SummaryBoard';
import { autoJoin } from '../state/session';
import { getSummaryMode } from '../selectors';

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
    }
    render() {
        const { summaryMode, strings } = this.props;
        const hideSnackbar = () => this.setState({ snackBarActive: false });
        return (
            <div>
                { summaryMode ? <SummaryBoard /> : <PostBoard /> }
                <Snackbar
                    action='Ok!'
                    icon='question_answer'
                    label={strings.hint}
                    type='accept'
                    active={this.state.snackBarActive}
                    timeout={10000}
                    onClick={hideSnackbar}
                    onTimeout={hideSnackbar}
                />
            </div>
        )
    }

    componentDidMount() {
        this.props.autoJoin(this.props.params.sessionId);
        this.setState({snackBarActive: true})
    }
}

Main.propTypes = {
    autoJoin: PropTypes.func,
    summaryMode: PropTypes.bool,
    strings: PropTypes.object
};

Main.defaultProps = {
    autoJoin: noop,
    summaryMode: false,
    strings: {
        hint: 'You can share invite others to this session by copy-pasting the URL'
    }
}

export default Main;
