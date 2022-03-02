import { connect } from 'react-redux';
import { fetchAccount } from '../../actions/account_actions';
import { fetchUser } from '../../actions/user_actions';
import UserShow from './user_show';

const mapSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId]
    const showUser = state.entities.users[ownProps.match.params.userId]
    // debugger
    return ({
        account: currentUser.account,
        user: showUser
    })
}

const mapDTP = dispatch => {
    return ({
        // fetchAccount: accountId => dispatch(fetchAccount(accountId)),
        fetchUser: userId => dispatch(fetchUser(userId))
    })
}

export default connect(mapSTP, mapDTP)(UserShow);
