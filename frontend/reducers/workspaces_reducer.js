import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_WORKSPACES } from '../actions/workspace_actions';

const workspacesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_WORKSPACES:
            // debugger
            return action.workspaces;
        case LOGOUT_CURRENT_USER:
            nextState = {};
            return nextState;
        default:
            return state;
    }
}

export default workspacesReducer