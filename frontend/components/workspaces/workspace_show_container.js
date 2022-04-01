import { connect } from 'react-redux';
import MainShow from './main_show';
import { openModal } from '../../actions/modal_actions'; 
import { fetchUsers } from '../../actions/user_actions'; 
import { fetchWorkspace, fetchWorkspaces, updateWorkspace, deleteWorkspace } from '../../actions/workspace_actions';
import { fetchBoard, fetchBoards, updateBoard, deleteBoard } from '../../actions/board_actions';
import { addWorkspaceMember } from '../../actions/workspace_member_actions';

const mapSTP = (state, ownProps) => {
    const isEmpty = Object.keys(state.entities.workspaces).length < 1
    if (isEmpty) {
        return ({ showType: 'workspace', boards: null })
    } else {
        const workspaces = state.entities.workspaces;
        const boards = state.entities.boards;
        const currentUser = state.entities.users[state.session.currentUserId];
        const currentAccount = currentUser.account;
        const currentAccountUsers = state.entities.users;
        const currentWorkspace = workspaces[state.session.currentWorkspaceId];
        // debugger
        return ({
            showType: 'workspace',
            workspaces: workspaces,
            boards: boards,
            currentUser: currentUser,
            currentAccount: currentAccount,
            currentAccountUsers: currentAccountUsers,
            currentWorkspace: currentWorkspace,
        })
    }
}

const mapDTP = dispatch => {
    return ({
        openModal: (modal) => dispatch(openModal(modal)),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
        updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
        deleteWorkspace: workspaceId => dispatch(deleteWorkspace(workspaceId)),
        addWorkspaceMember: workspaceMember => dispatch(addWorkspaceMember(workspaceMember)),
        fetchBoards: () => dispatch(fetchBoards()),
        fetchBoard: boardId => dispatch(fetchBoard(boardId)),
        updateBoard: board => dispatch(updateBoard(board)),
        deleteBoard: boardId => dispatch(deleteBoard(boardId))
    })
}

export default connect(mapSTP, mapDTP)(MainShow);
