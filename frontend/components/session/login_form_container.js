import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './signup_form';

const mapSTP = (state, ownProps) => {
    return ({
        errors: state.errors,
    })
}

const mapDTP = (dispatch, ownProps) => {
    return ({
        processForm: user => dispatch(login(user))
    })
}

export default connect(mapSTP, mapDTP)(LoginForm);