export const addItem = item => (
    $.ajax({
        method: 'POST',
        url: '/api/items',
        data: { item }
    })
)

export const deleteItem = itemId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/items/${itemId}`,
    })
)
