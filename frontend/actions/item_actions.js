import * as ItemApiUtil from '../util/item_api_util';
import { RECEIVE_BOARD } from './board_actions';

const receiveBoard = board => {
    return ({
        type: RECEIVE_BOARD,
        board
    })
}

export const addItem = item => dispatch => {
    return (
        ItemApiUtil.addItem(item)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}

export const updateItem = item => dispatch => {
    return (
        ItemApiUtil.updateItem(item)
            .then(
                updated => dispatch(receiveBoard(updated))
            )
    )
}

export const deleteItem = itemId => dispatch => {
    return (
        ItemApiUtil.deleteItem(itemId)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}