export const addColumn = column => (
    $.ajax({
        method: 'POST',
        url: '/api/columns',
        data: { column }
    })
)