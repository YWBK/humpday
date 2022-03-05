import * as BoardApiUtil from '../util/board_api_util';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';

const receiveBoard = board => {
    return ({
        type: RECEIVE_BOARD,
        board
    })
}
const receiveBoards = boards => {
    return ({
        type: RECEIVE_BOARDS,
        boards
    })
}

export const fetchBoard = boardId => dispatch => {
    return (
        BoardApiUtil.fetchBoard(boardId)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}
export const fetchBoards = () => dispatch => {
    // debugger
    return (
        BoardApiUtil.fetchBoards()
            .then(
                boards => dispatch(receiveBoards(boards))
            )
    )
}
export const addBoard = board => dispatch => {
    return (
        BoardApiUtil.addBoard(board)
            .then(
                created => dispatch(receiveBoard(created))
            )
    )
};