import * as GroupApiUtil from '../util/group_api_util';
import { RECEIVE_BOARD } from './board_actions';

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

export const updateGroup = group => dispatch => {
    return (
        GroupApiUtil.updateGroup(group)
            .then(
                updated => dispatch(receiveBoard(updated))
            )
    )
}

export const deleteGroup = groupId => dispatch => {
    return (
        GroupApiUtil.deleteGroup(groupId)
            .then(
                board => dispatch(receiveBoard(board))
            )
    )
}