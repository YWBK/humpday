import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_BOARD, RECEIVE_BOARDS, REMOVE_BOARD } from '../actions/board_actions';

const boardsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_BOARD:
            nextState[action.board.id] = action.board;
            return nextState;
        case RECEIVE_BOARDS:
            return action.boards;
        case RECEIVE_BOARDS:
            delete nextState[action.boardId];
            return nextState;
        case LOGOUT_CURRENT_USER:
            nextState = {};
            return nextState;
        default:
            return state;
    }
}

export default boardsReducer