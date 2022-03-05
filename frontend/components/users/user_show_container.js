import { connect } from 'react-redux';
import { fetchAccount } from '../../actions/account_actions';
import { fetchWorkspaces } from '../../actions/workspace_actions'
import { fetchUser } from '../../actions/user_actions';
import UserShow from './user_show';

const mapSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId]
    const showUser = state.entities.users[ownProps.match.params.userId]
    return ({
        account: currentUser.account,
        user: showUser
    })
}

const mapDTP = dispatch => {
    return ({
        fetchUser: userId => dispatch(fetchUser(userId)),
        fetchWorkspaces: () => dispatch(fetchWorkspaces())
    })
}

export default connect(mapSTP, mapDTP)(UserShow);
