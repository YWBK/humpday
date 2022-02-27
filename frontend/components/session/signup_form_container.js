import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { login } from '../../actions/session_actions';


const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors)
    })
}

const mapDTP = dispatch => {
    return ({
        login: (user, accountName) => dispatch(login(user, accountName))
    })
}

export default connect(mapSTP, mapDTP)(SignupForm);