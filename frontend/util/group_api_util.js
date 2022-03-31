export const addGroup = group => (
    $.ajax({
        method: 'POST',
        url: '/api/groups',
        data: { group }
    })
)

export const updateGroup = group => (
    $.ajax({
        method: 'PATCH',
        url: `api/groups/${group.id}`,
        data: { group }
    })
)

export const deleteGroup = groupId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/groups/${groupId}`
    })
)