import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_BOARD, REMOVE_BOARD } from '../actions/board_actions';

const itemsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_BOARD:
            // debugger
            nextState = {};
            if (!action.board.items) return nextState;
            
            return action.board.items;
        case REMOVE_BOARD:
            nextState = {};
            return nextState;
        case LOGOUT_CURRENT_USER:
            nextState = {};
            return nextState;
        default:
            return state;
    }
}

export default itemsReducer