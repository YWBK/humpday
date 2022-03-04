import { connect } from 'react-redux';
import WorkspaceShow from './workspace_show';
import { logout } from '../../actions/session_actions';
import { fetchAccount } from '../../actions/account_actions'; 
import { fetchUsers } from '../../actions/user_actions'; 
import { fetchWorkspace, updateWorkspace } from '../../actions/workspace_actions';
import { addWorkspaceMember } from '../../actions/workspace_member_actions';

const mapSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId]
    const currentWorkspace = state.entities.workspaces[ownProps.match.params.workspaceId];
    const members = currentWorkspace ? currentWorkspace.users : [];
    return ({
        currentWorkspace: currentWorkspace,
        workspaceMembers: members,
        account: currentUser.account,
        accountMembers: state.entities.users,
    })
}

const mapDTP = dispatch => {
    return ({
        // fetchAccount: accountId => dispatch(fetchAccount(accountId)),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
        updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
        addWorkspaceMember: workspaceMember => dispatch(addWorkspaceMember(workspaceMember))

    })
}

export default connect(mapSTP, mapDTP)(WorkspaceShow);
