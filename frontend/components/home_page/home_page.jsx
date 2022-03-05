import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceListItem from '../workspaces/workspace_list_item';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchWorkspaces();
    }

    render() {
        const { currentUser, workspaces, fetchWorkspace } = this.props
        if (Object.keys(workspaces).length < 1) return null;
        return(
            <div>
                <SideNavContainer className='side-nav' />
                
                <div className='main-content'>
                    <span>My workspaces</span>
                    <ul>
                        { workspaces.map((workspace) => {
                            return (
                            <WorkspaceListItem 
                                key={workspace.id} 
                                workspace={workspace}
                                currentAccount={currentUser.account}
                                fetchWorkspace={fetchWorkspace}
                            />
                        )})}
                    </ul>
                </div>
            </div>
        )
    }
}