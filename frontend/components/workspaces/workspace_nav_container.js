import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import WorkspaceNav from './workspace_nav';
import { fetchWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';
import { openModal } from '../../actions/modal_actions';

const mapSTP = (state, ownProps) => {
    const currentAccount = state.entities.accounts[state.session.currentAccountId];
    // debugger
    // const currentUser = state.entities.users[state.session.currentUserId]
    // const currentWorkspace = state.entities.workspaces[ownProps.match.params.workspaceId];
    return ({
        workspaces: Object.values(state.entities.workspaces),
        currentAccount: currentAccount
        // currentWorkspace: currentWorkspace,
        // account: currentUser.account,
        // currentUser: currentUser
    })
}

const mapDTP = dispatch => {
    return ({
        deleteWorkspace: workspaceId => dispatch(deleteWorkspace(workspaceId)),
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        openModal: (modal) => dispatch(openModal(modal))
    })
}

export default withRouter(connect(mapSTP, mapDTP)(WorkspaceNav));
