export const addGroup = group => (
    $.ajax({
        method: 'POST',
        url: '/api/groups',
        data: { group }
    })
)

export const deleteGroup = groupId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/groups/${groupId}`
    })
)