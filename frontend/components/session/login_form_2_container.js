import { connect } from 'react-redux';
import LoginForm2 from './login_form_2';
import { fetchAccountByName } from '../../actions/account_actions'


const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors),
    })
}

const mapDTP = (dispatch, ownProps) => {
    return ({
        fetchAccountByName: accountName => dispatch(fetchAccountByName(accountName)),
    })
}

export default connect(mapSTP, mapDTP)(LoginForm2);