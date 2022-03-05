import { connect } from 'react-redux';
import SideNav from './side_nav';
import { logout } from '../../actions/session_actions'
import { fetchWorkspace } from '../../actions/workspace_actions'

const mapSTP = (state) => {
    const currentUserId = state.session.currentUserId
    const workspaces = state.entities.workspaces
    if (currentUserId && (Object.keys(workspaces).length > 0)) {
        const currentUser = state.entities.users[state.session.currentUserId];
        // debugger
        return ({
            currentUser: currentUser,
            mainWorkspace: workspaces[Object.keys(workspaces)[0]],
            account: currentUser.account,
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
        logout: () => dispatch(logout()),
        fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId))
    })
}

export default connect(mapSTP, mapDTP)(SideNav);
