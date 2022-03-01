import { connect } from 'react-redux';
import WorkspaceShow from './workspace_show';
import { logout } from '../../actions/session_actions';
import { fetchWorkspaces } from '../../actions/workspace_actions';

const mapSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId]
    const currentWorkspace = state.entities.workspaces[ownProps.match.params.workspaceId];
    const members = currentWorkspace ? currentWorkspace.users : [];
    // debugger
    return ({
        currentWorkspace: currentWorkspace,
        workspaceMembers: members,
        account: currentUser.account
    })
}

const mapDTP = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        fetchWorkspaces: () => dispatch(fetchWorkspaces())
    })
}

export default connect(mapSTP, mapDTP)(WorkspaceShow);
