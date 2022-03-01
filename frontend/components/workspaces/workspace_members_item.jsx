import React from 'react';
import { Link } from 'react-router-dom';

const WorkspaceMembersItem = ({ member, account }) => {
    return (
        <li><Link to={`/${account.account_name}/users/${member.id}`}>{member.full_name}</Link></li>
    );
}
export default WorkspaceMembersItem;