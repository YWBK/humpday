import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceListItem = ({ workspace, account }) => {
    return (
        <li>
            <Link to={`/${account.account_name}/workspaces/${workspace.id}`}>
                {workspace.workspace_name}
            </Link>
        </li>

    );
}
export default WorkspaceListItem;