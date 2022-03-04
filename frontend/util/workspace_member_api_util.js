export const addWorkspaceMember = workspace_member => (
    $.ajax({
        method: 'POST',
        url: '/api/workspace_members',
        data: { workspace_member}
    })
)