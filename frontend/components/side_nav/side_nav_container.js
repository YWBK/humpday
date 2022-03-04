import { connect } from 'react-redux';
import SideNav from './side_nav';
import { logout } from '../../actions/session_actions'
import { fetchWorkspaces } from '../../actions/workspace_actions';

const mapSTP = (state) => {
    // debugger
    const currentUserId = state.session.currentUserId
    if (currentUserId) {
        const currentUser = state.entities.users[state.session.currentUserId];
        return ({
            currentUser: currentUser,
            mainWorkspace: currentUser.workspaces[0],
            account: currentUser.account,
            workspaces: state.entities.workspaces
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
    })
}

export default connect(mapSTP, mapDTP)(SideNav);
