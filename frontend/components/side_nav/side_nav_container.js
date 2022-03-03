import { connect } from 'react-redux';
import SideNav from './side_nav';
import { logout } from '../../actions/session_actions'

const mapSTP = (state) => {
    const currentUserId = state.session.currentUserId
    // debugger
    if (currentUserId) {
        const currentUser = state.entities.users[state.session.currentUserId];
        return ({
            currentUser: currentUser,
            mainWorkspace: currentUser.workspaces[0],
            account: currentUser.account
        })
    } else {
        return ({
            currentUser: null,
            mainWorkspace: null,
            account: null
        });
    }
}

const mapDTP = dispatch => {
    return ({
        logout: () => dispatch(logout())
    })
}

export default connect(mapSTP, mapDTP)(SideNav);
