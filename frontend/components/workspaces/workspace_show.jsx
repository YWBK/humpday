import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNavContainer from '../workspace_nav/workspace_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';
import WorkspaceMembersList from './workspace_members_list';


export default class WorkspaceShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchWorkspaces();
        this.props.fetchWorkspace(this.props.match.params.workspaceId);
    }

    componentDidUpdate(prevProps) {
        let currentWorkspaceName;
        const locationChanged = this.props.location.pathname !== prevProps.location.pathname;
        if (!this.state.workspaceName || locationChanged) {
            currentWorkspaceName = this.props.workspaces[this.props.match.params.workspaceId].workspaceName
            this.setState ({ workspaceName: currentWorkspaceName})
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    update(e) {
        this.setState({ workspaceName: e.currentTarget.value })
    }

    updateWorkspaceName() {
        const oldWorkspaceName = this.props.currentWorkspace.workspaceName;
        const workspaceId = this.props.currentWorkspace.id
        const workspace = Object.assign({}, { id: workspaceId , workspace_name: this.state.workspaceName });
        // debugger
        if (oldWorkspaceName !== this.state.workspaceName) {
            this.props.updateWorkspace(workspace);
        } else {
            null;
        }
    }

    render() {
        const { account, 
                accountMembers, 
                workspaces, 
                workspaceMembers, 
                currentWorkspace,
                boards, 
                openModal, 
                fetchUsers, 
                fetchWorkspace, 
                deleteWorkspace, 
                addWorkspaceMember } = this.props;
            return (
                <div className='' onClick={ () => this.updateWorkspaceName() } >
                    <SideNavContainer className='side-nav' />
                    <div className='main-content' >
                        <WorkspaceNav 
                            account={account}
                            workspaces={Object.values(workspaces)}
                            currentWorkspace={currentWorkspace}
                            boards={boards}
                            openModal={openModal}
                            fetchWorkspace={fetchWorkspace}
                            deleteWorkspace={deleteWorkspace}
                        />
                        {/* <WorkspaceNavContainer /> */}
                        <div className='workspace-content' >
                            <div className='workspace-cover'>COVER IMAGE TO GO HERE</div>
                            <div className='workspace-name'>
                                <input type='text' value={this.state.workspaceName} onChange={ e => this.update(e) } onClick={ e => e.stopPropagation() } />
                            </div>
                            <WorkspaceMembersList 
                                workspaceMembers={workspaceMembers}
                                account={account}
                                accountMembers={accountMembers}
                                fetchUsers={fetchUsers}
                                addWorkspaceMember={addWorkspaceMember}
                            />
                        </div>
                    </div>
                </div>
            )
        
    }
}