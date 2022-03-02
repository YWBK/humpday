import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS} from '../actions/session_actions';

const errorsReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    // debugger
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            nextState = action.errors.responseJSON;
            return nextState;
        case RECEIVE_CURRENT_USER: 
            nextState = [];
            return nextState;
        case CLEAR_SESSION_ERRORS:
            nextState = [];
            return [];
        default:
            return state;
    }
}

export default errorsReducer;