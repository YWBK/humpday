import { connect } from 'react-redux';
import MainShow from '../workspaces/main_show';
import { openModal } from '../../actions/modal_actions'; 
import { fetchUsers } from '../../actions/user_actions'; 
import { fetchWorkspace, fetchWorkspaces, updateWorkspace, deleteWorkspace } from '../../actions/workspace_actions';
import { fetchBoard, fetchBoards, updateBoard, deleteBoard } from '../../actions/board_actions';
import { addColumn, deleteColumn } from '../../actions/column_actions';
import { addGroup } from '../../actions/group_actions';
import { addWorkspaceMember } from '../../actions/workspace_member_actions';

// const mapSTP = (state, ownProps) => {
//     // debugger
//     const workspaces = state.entities.workspaces;
//     const isNotEmpty = Object.keys(workspaces).length > 0;
//     const currentUser = state.entities.users[state.session.currentUserId]
//     const currentBoard = ownProps.location.currentBoard ? 
//         ownProps.location.currentBoard :    
//         state.entities.boards[ownProps.match.params.boardId];
//     debugger
//     const currentWorkspace = isNotEmpty ? workspaces[currentBoard.workspace.id] : null;
//     // const boards = isNotEmpty ? workspaces[currentWorkspace.id].boards : null;
//     const boards = isNotEmpty ? state.entities.boards : null;
//     const members = isNotEmpty ? currentWorkspace.users : [];
//     return ({
//         account: currentUser.account,
//         accountMembers: state.entities.users,
//         workspaces: workspaces,
//         workspaceMembers: members,
//         currentWorkspace: currentWorkspace,
//         boards: boards,
//         currentBoard: currentBoard
//     })
// }

// const mapDTP = dispatch => {
//     return ({
//         // fetchAccount: accountId => dispatch(fetchAccount(accountId)),
//         openModal: (modal) => dispatch(openModal(modal)),
//         fetchUsers: () => dispatch(fetchUsers()),
//         fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
//         fetchWorkspaces: () => dispatch(fetchWorkspaces()),
//         updateWorkspace: workspace => dispatch(updateWorkspace(workspace)),
//         deleteWorkspace: workspaceId => dispatch(deleteWorkspace(workspaceId)),
//         fetchBoard: (boardId) => dispatch(fetchBoard(boardId)),
//         fetchBoards: (workspaceId) => dispatch(fetchBoards(workspaceId)),
        
//         addWorkspaceMember: workspaceMember => dispatch(addWorkspaceMember(workspaceMember))
//     })
// }

// export default connect(mapSTP, mapDTP)(BoardShow);

const mapSTP = (state, ownProps) => {
    // const isEmpty = state.session.currentWorkspaceId;
    // debugger
    const isEmpty = Object.keys(state.entities.workspaces).length < 1
    if (isEmpty) {
        return ({ showType: 'board', boards: null })
    } else {
        const workspaces = state.entities.workspaces;
        const boards = state.entities.boards;
        const currentUser = state.entities.users[state.session.currentUserId];
        const currentAccount = currentUser.account;
        const currentAccountUsers = state.entities.users;
        const currentBoard = state.session.currentBoardId ?
            boards[state.session.currentBoardId] :
            ownProps.location.currentBoard;
        const currentWorkspace = workspaces[currentBoard.workspace.id];
        // debugger

        return ({
            showType: 'board',
            workspaces: workspaces,
            boards: boards,
            currentUser: currentUser,
            currentAccount: currentAccount,
            currentAccountUsers: currentAccountUsers,
            currentWorkspace: currentWorkspace,
            currentBoard: currentBoard,
        })
    }
    // const currentUser = state.entities.users[state.session.currentUserId]
    // const currentWorkspace = workspaces[state.session.currentWorkspaceId];
    // const isNotEmpty = Object.keys(state.entities.boards) > 0;
    // const boards = isNotEmpty ? state.entities.boards : null;
    // // debugger
    // const members = currentWorkspace ? currentWorkspace.users : [];
    // // debugger
    // return ({
    //     account: currentUser.account,
    //     accountMembers: state.entities.users,
    //     workspaces: workspaces,
    //     workspaceMembers: members,
    //     currentWorkspace: currentWorkspace,
    //     boards: boards
    // })
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
        deleteBoard: boardId => dispatch(deleteBoard(boardId)),
        addColumn: column => dispatch(addColumn(column)),
        deleteColumn: columnId => dispatch(deleteColumn(columnId)),
        addGroup: group => dispatch(addGroup(group)),
        // fetchAccount: accountId => dispatch(fetchAccount(accountId)),
    })
}

export default connect(mapSTP, mapDTP)(MainShow);
