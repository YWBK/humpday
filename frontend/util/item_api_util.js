export const addItem = item => (
    $.ajax({
        method: 'POST',
        url: '/api/items',
        data: { item }
    })
)
