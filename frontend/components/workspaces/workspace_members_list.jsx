import React from 'react';
import { connect } from 'react-redux';
import WorkspaceMembersItem from './workspace_members_item';
import WorkspaceMembersAddItem from './workspace_members_add_item';

class WorkspaceMembersList extends React.Component {
    // debugger
    constructor(props) {
        super(props);
        this.inviteMenu = React.createRef();
        this.state = { active: false };
        this.handleOuterClickInvite = this.handleOuterClickInvite.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickInvite)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickInvite);
    }
    handleOuterClickInvite(e) {
        if (
            this.inviteMenu.current &&
            !this.inviteMenu.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }
    }

    toggleListClass() {
        this.setState({ active: !this.state.active })
    }

    render() {
        const { 
            currentWorkspace, 
            currentAccount, 
            currentAccountUsers, 
            addWorkspaceMember } = this.props
        
        if (currentWorkspace) {
            const allUsers = Object.values(currentAccountUsers)
            const workspaceUsers = allUsers.filter( user => user.workspaces
                    .filter( workspace => workspace.id === currentWorkspace.id).length > 0);
                    // debugger
            const uninvitedUsers = allUsers.filter( user => !workspaceUsers.includes(user));
            return (
                <div className='workspace-members-list-wrapper'>
                    <div className='workspace-members-invite'>
                        <span
                            className='workspace-invite-link' 
                            onClick={ () => this.toggleListClass() }>
                            Invite members to workspace
                        </span>
                        <ul 
                            ref={ this.inviteMenu }
                            className={ this.state.active ? 
                                'invite-list' : 
                                'invite-list hidden'}>
                                    <li>Members</li>
                                    { uninvitedUsers.map(user => (
                                        <WorkspaceMembersAddItem 
                                            key={user.id} 
                                            userId={user.id} 
                                            name={user.fullName}
                                            addWorkspaceMember={addWorkspaceMember} />
                                    ))}
                        </ul>
                    </div>
        
                    <div className='workspace-members-count'>
                        Members / {currentWorkspace.users.length}
                    </div>
                    <ul className='workspace-members-list'>
                        { workspaceUsers.map(user => (
                            <WorkspaceMembersItem 
                                key={user.id} 
                                user={user} 
                                currentAccount={currentAccount} 
                                onClick={ e => e.stopPropagation() } 
                            />
                        ))}
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    };
}

export default WorkspaceMembersList;