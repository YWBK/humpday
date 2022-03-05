import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceListItem = ({ workspace, currentAccount, fetchWorkspace }) => {
    return (
            <Link 
                to={{
                    pathname: `/${currentAccount.account_name}/workspaces/${workspace.id}`,
                    // workspaceMembers: workspace.users,
                    currentAccount: currentAccount,
                    currentWorkspace: workspace,
                }}
                onClick={ ()=> fetchWorkspace(workspace.id)}>
                <li>{workspace.workspaceName}</li>
            </Link>

    );
}
export default WorkspaceListItem;