import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceMembersItem from '../workspaces/workspace_members_item';

export default class UsersIndex extends React.Component {
    componentDidMount() {
        this.props.fetchUsers()
            .then(() => this.props.fetchWorkspaces());
    }

    render() {
        const { users, account } = this.props
        // debugger
        if (users) {
            return(
                <div className='users-index'>
                    <SideNavContainer className='side-nav' />
                    <div className='main-content' id='users-index'>
                        <div className='usersListTitle'>All users</div>
                        <div className='usersListHeaders'>
                            <span className='usersNameHeader'>Name</span>
                            <span className='usersEmailHeader'>Email</span>
                        </div>
                        <ul className='usersList'>
                            { Object.values(users).map(user => (
                                <WorkspaceMembersItem 
                                    key={user.id} 
                                    user={user} 
                                    currentAccount={account}
                                />
                                // <li key={user.id} >user</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) 
        } else {
            return null
        }
    }
}