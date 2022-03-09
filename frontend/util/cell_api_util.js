export const updateStatus = status => (
    $.ajax({
        method: 'PATCH',
        url: `/api/statuses/${status.id}`,
        data: { status }
    })
)

export const updateItemPerson = itemPerson => (
    $.ajax({
        method: 'PATCH',
        url: `/api/item_people/${itemPerson.id}`,
        data: { itemPerson }
    })
)

export const updateDueDate = dueDate => (
    $.ajax({
        method: 'PATCH',
        url: `/api/due_dates/${dueDate.id}`,
        data: { dueDate }
    })
)