import * as WorkspaceApiUtil from '../util/workspace_api_util';
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';

const receiveWorkspaces = workspaces => {
    return ({
        type: RECEIVE_WORKSPACES,
        workspaces
    })
}
const receiveWorkspace = workspace => {
    return ({
        type: RECEIVE_WORKSPACE,
        workspace
    })
}
const removeWorkspace = (workspaceId, mainId) => {
    return ({
        type: REMOVE_WORKSPACE,
        workspaceId,
        mainId
    })
}


export const fetchWorkspaces = () => dispatch => {
    return (
        WorkspaceApiUtil.fetchWorkspaces()
        .then(
            workspaces => dispatch(receiveWorkspaces(workspaces))
            )
            );
        }
export const fetchWorkspace = workspaceId => dispatch => {
    return (
        WorkspaceApiUtil.fetchWorkspace(workspaceId)
            .then(
                workspace => dispatch(receiveWorkspace(workspace))
            )
    );
}
export const addWorkspace = workspace => dispatch => {
    return (
        WorkspaceApiUtil.addWorkspace(workspace)
            .then(
                created => dispatch(receiveWorkspace(created))
            )
    );
}


export const deleteWorkspace = workspaceId => dispatch => {
    return (
        WorkspaceApiUtil.deleteWorkspace(workspaceId)
            .then(
                (main) => dispatch(removeWorkspace(workspaceId, main.id))
            )
    )
}