import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { fetchAccountByName } from '../../actions/account_actions'
import LoginForm3 from './login_form_3';

const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors),
    })
}

const mapDTP = (dispatch, ownProps) => {
    return ({
        fetchAccountByName: accountName => dispatch(fetchAccountByName(accountName)),
        login: (user, accountName) => dispatch(login(user, accountName))
    })
}

export default connect(mapSTP, mapDTP)(LoginForm3);