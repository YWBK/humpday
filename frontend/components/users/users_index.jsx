import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceMembersItem from '../workspaces/workspace_members_item';

export default class UsersIndex extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const { users, account } = this.props
        // debugger
        return(
            <div className='users-index'>
                <SideNavContainer />
                <ul>
                    { users.map(user => (
                        <WorkspaceMembersItem key={user.id} member={user} account={account}/>
                        // <li key={user.id} >{user.fullName}</li>
                    ))}
                </ul>
            </div>
        ) 
    }
}