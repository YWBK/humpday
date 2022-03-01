import * as WorkspaceApiUtil from '../util/workspace_api_util';
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';

const receiveWorkspaces = workspaces => {
    return ({
        type: RECEIVE_WORKSPACES,
        workspaces
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
