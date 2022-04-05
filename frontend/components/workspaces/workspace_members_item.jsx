import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceMembersItem = ({ user, currentAccount }) => {
    return (
        <li className='user-item' onClick={ e => e.stopPropagation() }>
            <div className='userName'>
                <Link to={`/${currentAccount.accountName}/users/${user.id}`}>
                    {user.fullName}
                </Link>
            </div>
            <div className='userEmail'>
                {user.email}
            </div>
        </li>
    );
}
export default WorkspaceMembersItem;