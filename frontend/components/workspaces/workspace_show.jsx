import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNavContainer from '../workspace_nav/workspace_nav_container';
import WorkspaceMembersList from './workspace_members_list';
import WorkspaceMembersItem from './workspace_members_item';


export default class WorkspaceShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        // debugger
        this.props.fetchUsers();
        this.props.fetchWorkspace(this.props.match.params.workspaceId);
    }

    componentDidUpdate(prevProps) {
        // debugger 
        let currentWorkspaceName;
        const locationChanged = this.props.location !== prevProps.location;
        if (!this.state.workspaceName || locationChanged) {
            currentWorkspaceName = this.props.currentWorkspace ? this.props.currentWorkspace.workspaceName : '';
            // debugger
            // this.setState ({ workspaceName: 'hi'})
            this.setState ({ workspaceName: currentWorkspaceName})
        }
        // debugger
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
        const { workspaceMembers, account, accountMembers, fetchUsers, addWorkspaceMember } = this.props;
        // debugger
            // debugger
            return (
                <div className='main_content' id='workspace-content' onClick={ () => this.updateWorkspaceName() } >
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
            )
        
    }
}