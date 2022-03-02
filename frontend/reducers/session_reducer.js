import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';

const sessionReducer = (state = {currentUserId: null}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.currentUserId = action.currentUser.id;
            nextState.currentAccountId = action.currentAccount.id;
            return nextState;
        case LOGOUT_CURRENT_USER:
            nextState.currentUserId = null;
            nextState.accountId = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer