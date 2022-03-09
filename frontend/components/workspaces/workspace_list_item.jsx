import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceListItem = ({ workspace, currentAccount, fetchWorkspace }) => {
    return (
        <li className='workspace-link-wrapper'>
            <Link 
                to={{
                    pathname: `/${currentAccount.accountName}/workspaces/${workspace.id}`,
                    // workspaceMembers: workspace.users,
                    currentAccount: currentAccount,
                    currentWorkspace: workspace,
                }}
                onClick={ ()=> fetchWorkspace(workspace.id)}
                className='workspace-link'>
                {workspace.workspaceName}
            </Link>
        </li>

    );
}
export default WorkspaceListItem;