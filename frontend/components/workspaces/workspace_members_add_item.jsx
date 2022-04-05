import React from 'react';
import { withRouter } from 'react-router-dom';

const WorkspaceMembersAddItem = ({ name, userId, addWorkspaceMember, match }) => {
    const [ memberName, setMemberName] = React.useState(name);

    const newWorkspaceMember = (e) => {
        e.stopPropagation();
        const newMember = Object.assign({}, {user_id: userId, workspace_id: parseInt(match.params.workspaceId)});
        addWorkspaceMember(newMember)
    }

    return (
        <li 
            className='invite-list-item'
            onClick={ e => newWorkspaceMember(e) }>
                {memberName}
        </li>
    );
}
export default withRouter(WorkspaceMembersAddItem);