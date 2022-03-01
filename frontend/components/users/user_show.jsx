import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';

export default class UserShow extends React.Component {
    render() {
        const { currentUser } = this.props
        return(
            <div className='user-show'>
                <SideNavContainer />
                <div className='user-name'>{currentUser.fullName}</div>
                <div className='user-email'>{currentUser.email}</div>
            </div>
        ) 
    }
}