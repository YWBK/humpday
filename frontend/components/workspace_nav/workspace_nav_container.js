// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom'; 
// import WorkspaceNav from './workspace_nav';
// import { fetchWorkspace, fetchWorkspaces, deleteWorkspace } from '../../actions/workspace_actions';
// import { fetchBoard } from '../../actions/board_actions';
// import { openModal } from '../../actions/modal_actions';

// const mapSTP = (state, ownProps) => {
//     // debugger
//     const workspaces = state.entities.workspaces;
//     const currentWorkspaceId = state.session.currentWorkspaceId;
//     const boards = currentWorkspaceId ? workspaces[currentWorkspaceId].boards : null;
//     return ({
//         workspaces: Object.values(workspaces),
//         currentAccount: state.entities.accounts[state.session.currentAccountId],
//         currentWorkspaceId: currentWorkspaceId,
//         boards: boards
//     })
// }

// const mapDTP = dispatch => {
//     // debugger
//     return ({
//         deleteWorkspace: workspaceId => dispatch(deleteWorkspace(workspaceId)),
//         fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
//         fetchWorkspaces: () => dispatch(fetchWorkspaces()),
//         fetchBoard: boardId => dispatch(fetchBoard(boardId)),
//         openModal: (modal) => dispatch(openModal(modal))
//     })
// }

// export default withRouter(connect(mapSTP, mapDTP)(WorkspaceNav));
