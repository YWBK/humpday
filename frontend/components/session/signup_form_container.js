import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapSTP = (state, ownProps) => {
    return ({
        errors: state.errors
    })
}

export default connect(mapSTP, null)(SignupForm);