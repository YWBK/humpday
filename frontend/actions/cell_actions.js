import * as CellApiUtil from '../util/cell_api_util';
import { RECEIVE_BOARD } from './board_actions';

const receiveBoard = board => {
    return ({
        type: RECEIVE_BOARD,
        board
    })
}

export const updateStatus = status => dispatch => {
    return(
        CellApiUtil.updateStatus(status)
            .then(board => dispatch(receiveBoard(board)))
    )
}

export const updateItemPerson = itemPerson => dispatch => {
    return(
        CellApiUtil.updateItemPerson(itemPerson)
            .then(board => dispatch(receiveBoard(board)))
    )
}

export const updateDueDate = dueDate => dispatch => {
    return(
        CellApiUtil.updateDueDate(dueDate)
            .then(board => dispatch(receiveBoard(board)))
    )
}