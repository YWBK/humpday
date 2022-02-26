import { RECEIVE_CURRENT_USER, RECEIVE_USER_BY_EMAIL } from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze({}, state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState[action.currentUser.id] = action.currentUser;
            return nextState;
            // return Object.assign(
            //     {}, 
            //     state, 
            //     { [action.currentUser.id]: action.currentUser }
            // );
        case RECEIVE_USER_BY_EMAIL:
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;