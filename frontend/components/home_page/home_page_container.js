import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchAccountByName } from '../../actions/account_actions'
import { logout } from '../../actions/session_actions'

const mapSTP = (state) => {
    return ({
        workspaces: state.entities.users[state.session.currentUserId].workspaces
    })
}

const mapDTP = dispatch => {
    return ({
        fetchAccountByName: accountName => dispatch(fetchAccountByName(accountName)),
        logout: () => dispatch(logout())
    })
}

export default connect(mapSTP, mapDTP)(HomePage);

