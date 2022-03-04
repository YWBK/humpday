import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceListItem from '../workspaces/workspace_list_item';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props
        return(
            <div>
                <SideNavContainer className='side-nav' />
                
                <div className='main-content'>
                    <span>My workspaces</span>
                    <ul>
                        { currentUser.workspaces.map((workspace) => (
                            <WorkspaceListItem key={workspace.id} workspace={workspace} account={currentUser.account} />
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}