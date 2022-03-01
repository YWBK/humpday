import { connect } from 'react-redux';
import SideNav from './side_nav';
import { logout } from '../../actions/session_actions'

const mapSTP = (state) => {
    const currentUser = state.entities.users[state.session.currentUserId]
    return ({
        currentUser: currentUser,
        mainWorkspace: currentUser.workspaces[0],
        account: currentUser.account
    })
}

const mapDTP = dispatch => {
    return ({
        logout: () => dispatch(logout())
    })
}

export default connect(mapSTP, mapDTP)(SideNav);
