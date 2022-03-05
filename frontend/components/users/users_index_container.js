import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchWorkspaces } from '../../actions/workspace_actions'
import UsersIndex from './users_index';

const mapSTP = (state, ownProps) => {
    const accountUsers = state.entities.users
    const currentUser = state.entities.users[state.session.currentUserId]
    return ({
        users: accountUsers,
        account: currentUser.account
    })
}

const mapDTP = dispatch => {
    return ({
        fetchUsers: () => dispatch(fetchUsers()),
        fetchWorkspaces: () => dispatch(fetchWorkspaces())
    })
}

export default connect(mapSTP, mapDTP)(UsersIndex);
