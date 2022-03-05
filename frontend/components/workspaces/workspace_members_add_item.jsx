import React from 'react';
import { withRouter } from 'react-router-dom';

const WorkspaceMembersAddItem = ({ name, userId, addWorkspaceMember, match }) => {
    const newWorkspaceMember = (e) => {
        e.stopPropagation();
        const newMember = Object.assign({}, {user_id: userId, workspace_id: parseInt(match.params.workspaceId)});
        addWorkspaceMember(newMember);
    }

    return (
        <li onClick={ e => newWorkspaceMember(e) }>
            {name}
        </li>
    );
}
export default withRouter(WorkspaceMembersAddItem);