import { connect } from 'react-redux';
import LoginForm1 from './login_form_1';

const mapSTP = (state, ownProps) => {
    return ({
        errors: Object.values(state.errors),
    })
}


export default connect(mapSTP, null)(LoginForm1);