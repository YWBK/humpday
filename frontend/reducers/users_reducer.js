import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze({}, state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState[action.currentUser.id] = action.currentUser;
            return nextState;
        case RECEIVE_USERS:
            return action.users;
        case RECEIVE_USER:
            // debugger
            nextState[action.user.id] = action.user;
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;