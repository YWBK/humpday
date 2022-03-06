export const addColumn = column => (
    $.ajax({
        method: 'POST',
        url: '/api/columns',
        data: { column }
    })
)

export const deleteColumn = columnId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/columns/${columnId}`
    })
)