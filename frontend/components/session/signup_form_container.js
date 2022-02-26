import { connect } from 'react-redux';
import SignupForm from './signup_form';

const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors)
    })
}

export default connect(mapSTP, null)(SignupForm);