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
    componentDidMount() {
        this.props.fetchWorkspaces();
    }
    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render() {
        const { currentWorkspace, workspaceMembers, account } = this.props;
        return (
            <div>
                <SideNavContainer />
                <div className={ this.state.active ? 'workspace-nav' : 'workspace-nav-hidden' } ><WorkspaceNavContainer /></div>
                <div className='workspace-cover'>COVER IMAGE TO GO HERE</div>
                <div className='workspace-icon'>M</div>
                <div className='workspace-name'>
                    <input type='text' value={currentWorkspace ? currentWorkspace.workspaceName : '' } onChange={this.update('workspaceName')} />
                </div>
                <div className='workspace-members-list-wrapper'>
                    <p>Members</p>
                    <ul className='workspace-members-list'>
                        { workspaceMembers.map(member => (
                            <WorkspaceMembersItem key={member.id} member={member} account={account}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}