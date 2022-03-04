import * as WorkspaceMemberApiUtil from '../util/workspace_member_api_util';
export const RECEIVE_WORKSPACE_MEMBER = 'RECEIVE_WORKSPACES_MEMBER';

const receiveWorkspaceMember = workspaceMember => {
    return ({
        type: RECEIVE_WORKSPACE_MEMBER,
        workspaceMember
    })
}
export const addWorkspaceMember = workspaceMember => dispatch => {
    return (
        WorkspaceMemberApiUtil.addWorkspaceMember(workspaceMember)
            .then(
                created => dispatch(receiveWorkspaceMember(created))
            )
    );
}