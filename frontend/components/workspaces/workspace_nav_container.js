import { connect } from 'react-redux';
import WorkspaceNav from './workspace_nav';
import { fetchWorkspaces } from '../../actions/workspace_actions';

// const mapSTP = (state, ownProps) => {
//     // const currentUser = state.entities.users[state.session.currentUserId]
//     // const currentWorkspace = state.entities.workspaces[ownProps.match.params.workspaceId];
//     return ({
//         // currentWorkspace: currentWorkspace,
//         // account: currentUser.account,
//         // currentUser: currentUser
//     })
// }

const mapDTP = dispatch => {
    return ({
        fetchWorkspaces: () => dispatch(fetchWorkspaces())
    })
}

export default connect(null, mapDTP)(WorkspaceNav);
