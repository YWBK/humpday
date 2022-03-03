import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNavContainer from './workspace_nav_container';
import WorkspaceMembersItem from './workspace_members_item';

export default class WorkspaceShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidUpdate(prevProps) {
        let currentWorkspaceName;
        const locationChanged = this.props.location !== prevProps.location;
        if (!this.state.workspaceName || locationChanged) {
            currentWorkspaceName = this.props.currentWorkspace ? this.props.currentWorkspace.workspaceName : '';
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
        const workspaceId = this.props.currentWorkspace.id
        const workspace = Object.assign({}, { id: workspaceId , workspace_name: this.state.workspaceName });
        this.props.updateWorkspace(workspace);
    }

    render() {
        const { workspaceMembers, account } = this.props;
        return (
            <div className='main-content' id='workspace-content' onClick={ () => this.updateWorkspaceName() } >
                {/* <SideNavContainer /> */}
                <WorkspaceNavContainer />
                <div className='workspace-content' >
                    <div className='workspace-cover'>COVER IMAGE TO GO HERE</div>
                    <div className='workspace-icon'>M</div>
                    <div className='workspace-name'>
                        <input type='text' value={this.state.workspaceName} onChange={ e => this.update(e) } onClick={ e => e.stopPropagation() } />
                    </div>
                    <div className='workspace-members-list-wrapper'>
                        <p>Members</p>
                        <ul className='workspace-members-list'>
                            { workspaceMembers.map(member => (
                                <WorkspaceMembersItem key={member.id} member={member} account={account} onClick={ e => e.stopPropagation() } />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}