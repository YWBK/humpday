import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_WORKSPACE, REMOVE_WORKSPACE } from '../actions/workspace_actions';

const sessionReducer = (state = {currentUserId: null}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.currentUserId = action.currentUser.id;
            nextState.currentAccountId = action.currentAccount.id;
            return nextState;
        case RECEIVE_WORKSPACE:
            nextState.currentWorkspaceId = action.workspace.id;
            return nextState;
        case REMOVE_WORKSPACE:
            nextState.currentWorkspaceId = action.mainId;
            return nextState;
        case LOGOUT_CURRENT_USER:
            nextState.currentUserId = null;
            nextState.currentAccountId = null;
            nextState.currentWorkspaceId = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer