import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import UsersIndex from './users_index';

const mapSTP = (state, ownProps) => {
    // const currentUser = state.entities.users[ownProps.match.params.userId]
    const accountMembers = state.entities.users
    const currentUser = state.entities.users[state.session.currentUserId]
    // debugger
    return ({
        users: Object.values(accountMembers),
        account: currentUser.account
    })
}

const mapDTP = dispatch => {
    return ({
        fetchUsers: () => dispatch(fetchUsers()),
    })
}

export default connect(mapSTP, mapDTP)(UsersIndex);
