import { connect } from 'react-redux';
import WorkspaceNav from './workspace_nav';
import { fetchWorkspaces } from '../../actions/workspace_actions';
import { openModal } from '../../actions/modal_actions';

const mapSTP = (state, ownProps) => {
    // const currentUser = state.entities.users[state.session.currentUserId]
    // const currentWorkspace = state.entities.workspaces[ownProps.match.params.workspaceId];
    return ({
        workspaces: Object.values(state.entities.workspaces)
        // currentWorkspace: currentWorkspace,
        // account: currentUser.account,
        // currentUser: currentUser
    })
}

const mapDTP = dispatch => {
    return ({
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        openModal: (modal) => dispatch(openModal(modal))
    })
}

export default connect(mapSTP, mapDTP)(WorkspaceNav);
