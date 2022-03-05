import { connect } from 'react-redux';
import BoardShow from './board_show';
import { openModal } from '../../actions/modal_actions'; 
import { fetchUsers } from '../../actions/user_actions'; 
import { fetchWorkspace, fetchWorkspaces, updateWorkspace, deleteWorkspace } from '../../actions/workspace_actions';
import { fetchBoard, fetchBoards } from '../../actions/board_actions';
import { addWorkspaceMember } from '../../actions/workspace_member_actions';

const mapSTP = (state, ownProps) => {
    // debugger
    const workspaces = state.entities.workspaces;
    const isNotEmpty = Object.keys(workspaces).length > 0;
    const currentUser = state.entities.users[state.session.currentUserId]
    const currentBoard = ownProps.location.currentBoard ? 
        ownProps.location.currentBoard :    
        state.entities.boards[ownProps.match.params.boardId];
    debugger
    const currentWorkspace = isNotEmpty ? workspaces[currentBoard.workspace.id] : null;
    // const boards = isNotEmpty ? workspaces[currentWorkspace.id].boards : null;
    const boards = isNotEmpty ? state.entities.boards : null;
    const members = isNotEmpty ? currentWorkspace.users : [];
    return ({
        account: currentUser.account,
        accountMembers: state.entities.users,
        workspaces: workspaces,
        workspaceMembers: members,
        currentWorkspace: currentWorkspace,
        boards: boards,
        currentBoard: currentBoard
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
        fetchBoard: (boardId) => dispatch(fetchBoard(boardId)),
        fetchBoards: (workspaceId) => dispatch(fetchBoards(workspaceId)),
        
        addWorkspaceMember: workspaceMember => dispatch(addWorkspaceMember(workspaceMember))
    })
}

export default connect(mapSTP, mapDTP)(BoardShow);
