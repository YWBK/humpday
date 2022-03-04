

export const addBoard = board => (
    $.ajax({
        method: 'POST',
        url: '/api/boards',
        data: { board }
    })
)