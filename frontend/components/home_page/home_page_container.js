import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspace_actions';

const mapSTP = (state) => {
    const currentUser = state.entities.users[state.session.currentUserId];
    // debugger
    return ({
        currentUser: currentUser,
        // currentAccount: state.entities.accounts[state.session.currentAccountId],
        workspaces: Object.values(state.entities.workspaces)
    })
}

const mapDTP = (dispatch) => {
    return ({
        fetchWorkspace: (workspaceId) => dispatch(fetchWorkspace(workspaceId)),
        fetchWorkspaces: () => dispatch(fetchWorkspaces())
    })
}

export default connect(mapSTP, mapDTP)(HomePage);

