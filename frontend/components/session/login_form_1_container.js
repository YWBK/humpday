import { connect } from 'react-redux';
import LoginForm1 from './login_form_1';
import { login } from '../../actions/session_actions';


const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors),
    })
}

const mapDTP = dispatch => {
    return ({
        findUserByEmail: email => dispatch(findUserByEmail(email)),
        login: (user, accountName) => dispatch(login(user, accountName))
    })
}

export default connect(mapSTP, mapDTP)(LoginForm1);