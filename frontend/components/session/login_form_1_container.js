import { connect } from 'react-redux';
import LoginForm1 from './login_form_1';

const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors),
    })
}

const mapDTP = dispatch => {
    return ({
        findUserByEmail: email => dispatch(findUserByEmail(email))
    })
}

export default connect(mapSTP, mapDTP)(LoginForm1);