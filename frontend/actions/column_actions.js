import * as ColumnApiUtil from '../util/column_api_util';
import { RECEIVE_BOARD } from './board_actions';

const receiveBoard = board => {
    return ({
        type: RECEIVE_BOARD,
        board
    })
}

export const addColumn = column => dispatch => {
    return (
        ColumnApiUtil.addColumn(column)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}
export const deleteColumn = columnId => dispatch => {
    return (
        ColumnApiUtil.deleteColumn(columnId)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}