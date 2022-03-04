import { connect } from 'react-redux';
import WorkspaceShow from './workspace_show';
import { openModal } from '../../actions/modal_actions'; 
import { fetchUsers } from '../../actions/user_actions'; 
import { fetchWorkspace, fetchWorkspaces, updateWorkspace, deleteWorkspace } from '../../actions/workspace_actions';
import { addWorkspaceMember } from '../../actions/workspace_member_actions';

const mapSTP = (state, ownProps) => {
    const workspaces = state.entities.workspaces;
    const currentUser = state.entities.users[state.session.currentUserId]
    const currentWorkspace = workspaces[state.session.currentWorkspaceId];
    const boards = currentWorkspace ? workspaces[currentWorkspace.id].boards : null;
    const members = currentWorkspace ? currentWorkspace.users : [];
    return ({
        account: currentUser.account,
        accountMembers: state.entities.users,
        workspaces: workspaces,
        workspaceMembers: members,
        currentWorkspace: currentWorkspace,
        boards: boards
    })
}

const mapDTP = dispatch => {
    return ({
        // fetchAccount: accountId => dispatch(fetchAccount(accountId)),
        openModal: (modal) => dispatch(openModal(modal)),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
        deleteWorkspace: workspaceId => dispatch(deleteWorkspace(workspaceId)),
        addWorkspaceMember: workspaceMember => dispatch(addWorkspaceMember(workspaceMember))
    })
}

export default connect(mapSTP, mapDTP)(WorkspaceShow);
