import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceListItem from '../workspaces/workspace_list_item';

export default class HomePage extends React.Component {

    render() {
        const { currentUser } = this.props
        return(
            <div className='home-page'>
                <SideNavContainer />
                <ul>
                    { currentUser.workspaces.map((workspace) => (
                        <WorkspaceListItem key={workspace.id} workspace={workspace} account={currentUser.account} />
                    ))}
                </ul>
            </div>
        )
    }
}