import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceMembersItem = ({ member, account }) => {
    // debugger
    return (
        <li onClick={ e => e.stopPropagation() }>
            <Link to={`/${account.account_name}/users/${member.id}`}>
                {member.fullName ? member.fullName : member.full_name}
            </Link>
        </li>
    );
}
export default WorkspaceMembersItem;