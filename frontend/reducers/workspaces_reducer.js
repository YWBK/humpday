import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_WORKSPACES, RECEIVE_WORKSPACE, REMOVE_WORKSPACE } from '../actions/workspace_actions';
import { RECEIVE_WORKSPACE_MEMBER } from '../actions/workspace_member_actions';

const workspacesReducer = (state = {}, action) => {
    // debugger
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_WORKSPACES:
            return action.workspaces;
        case RECEIVE_WORKSPACE:
            nextState[action.workspace.id] = action.workspace;
            return nextState;
        case RECEIVE_WORKSPACE_MEMBER:
            nextState[action.workspaceMember.workspace.id].users.push(action.workspaceMember.user)
            return nextState;
        case REMOVE_WORKSPACE:
            delete nextState[action.workspaceId]
            return nextState;
        case LOGOUT_CURRENT_USER:
            nextState = {};
            return nextState;
        default:
            return state;
    }
}

export default workspacesReducer