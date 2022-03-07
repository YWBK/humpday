import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceMembersItem = ({ user, currentAccount }) => {
    return (
        <li onClick={ e => e.stopPropagation() }>
            <Link to={`/${currentAccount.accountName}/users/${user.id}`}>
                {user.fullName}
            </Link>
        </li>
    );
}
export default WorkspaceMembersItem;