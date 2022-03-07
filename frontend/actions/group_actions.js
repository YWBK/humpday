import * as GroupApiUtil from '../util/group_api_util';
import { RECEIVE_BOARD, REMOVE_BOARD } from './board_actions';

const receiveBoard = board => {
    return ({
        type: RECEIVE_BOARD,
        board
    })
}

export const addGroup = group => dispatch => {
    return (
        GroupApiUtil.addGroup(group)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}