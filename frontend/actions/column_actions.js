import * as ColumnApiUtil from '../util/column_api_util';
export const RECEIVE_COLUMN = 'RECEIVE_COLUMN';

const receiveColumn = column => {
    return ({
        type: RECEIVE_COLUMN,
        column
    })
}

export const addColumn = column => dispatch => {
    return (
        ColumnApiUtil.addColumn(column)
            .then(
                created => dispatch(receiveColumn(column))
            )
    )
}