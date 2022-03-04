import * as BoardApiUtil from '../util/board_api_util';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';

const receiveBoard = board => {
    return ({
        type: RECEIVE_BOARD,
        board
    })
}

export const addBoard = board => dispatch => {
    return (
        BoardApiUtil.addBoard(board)
            .then(
                created => dispatch(receiveBoard(created))
            )
    )
};