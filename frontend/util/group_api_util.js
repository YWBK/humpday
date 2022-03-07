export const addGroup = group => (
    $.ajax({
        method: 'POST',
        url: '/api/groups',
        data: { group }
    })
)