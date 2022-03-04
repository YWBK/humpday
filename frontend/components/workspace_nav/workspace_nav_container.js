import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import WorkspaceNav from './workspace_nav';
import { fetchWorkspace, fetchWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';
import { openModal } from '../../actions/modal_actions';

const mapSTP = (state, ownProps) => {
    return ({
        workspaces: Object.values(state.entities.workspaces),
        currentAccount: state.entities.accounts[state.session.currentAccountId],
        currentWorkspaceId: state.session.currentWorkspaceId
    })
}

const mapDTP = dispatch => {
    return ({
        deleteWorkspace: workspaceId => dispatch(deleteWorkspace(workspaceId)),
        fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        openModal: (modal) => dispatch(openModal(modal))
    })
}

export default withRouter(connect(mapSTP, mapDTP)(WorkspaceNav));
