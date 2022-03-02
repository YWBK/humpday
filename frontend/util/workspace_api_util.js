

export const fetchWorkspaces = () => (
    $.ajax({
        method: 'GET',
        url: '/api/workspaces'
    })
)

export const fetchWorkspace = workspaceId => (
    $.ajax({
        method: 'GET',
        url: `/api/workspaces/${workspaceId}`
    })
)

export const addWorkspace = workspace => (
    $.ajax({
        method: 'POST',
        url: '/api/workspace',
        data: { workspace }
    })
)

export const deleteWorkspace = workspaceId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/workspaces/${workspaceId}`
    })
)

