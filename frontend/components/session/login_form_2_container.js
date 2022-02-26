import { connect } from 'react-redux';
import LoginForm2 from './login_form_2';

const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors),
    })
}


export default connect(mapSTP, null)(LoginForm2);