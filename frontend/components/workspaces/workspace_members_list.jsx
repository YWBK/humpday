import React from 'react';
import { connect } from 'react-redux';
import WorkspaceMembersItem from './workspace_members_item';
import WorkspaceMembersAddItem from './workspace_members_add_item';

class WorkspaceMembersList extends React.Component {
    // debugger
    constructor(props) {
        super(props);
        this.state = { active: false };
    }

    toggleListClass() {
        this.setState({ active: !this.state.active })
    }

    render() {
        const { workspaceMembers, account, accountMembers, addWorkspaceMember } = this.props
        const acctMembers = Object.values(accountMembers);
        // debugger
        console.log('workspace:', workspaceMembers)
        console.log('account:', accountMembers);
        return (
            <div className='workspace-members-list-wrapper'>
                <div className='workspace-members-invite'>
                    <span onClick={ () => this.toggleListClass() }>Invite members to workspace</span>
                    <ul className={ this.state.active ? 'invite-list' : 'invite-list hidden'}>
                        { acctMembers.map(acctMember => (
                            <WorkspaceMembersAddItem 
                                key={acctMember.id} 
                                userId={acctMember.id} 
                                name={acctMember.fullName}
                                addWorkspaceMember={addWorkspaceMember}
                                />
                        ))}
                    </ul>
                </div>
    
                <div className='workspace-members-count'>
                    Members / {workspaceMembers.length}
                </div>
                <ul className='workspace-members-list'>
                    { workspaceMembers.map(member => (
                        <WorkspaceMembersItem 
                            key={member.id} 
                            member={member} 
                            account={account} 
                            onClick={ e => e.stopPropagation() } 
                        />
                    ))}
                </ul>
            </div>
        );
    };
}



export default WorkspaceMembersList;