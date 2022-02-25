import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import InvitationForm from './invitation_form';

const mapSTP = (state, ownProps) => {
    return ({
        errors: state.errors,
    })
}

const mapDTP = (dispatch, ownProps) => {
    return ({
        signup: (user, accountName) => dispatch(signup(user, accountName))
    })
}

export default connect(mapSTP, mapDTP)(InvitationForm);