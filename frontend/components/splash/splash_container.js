import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Splash from './splash';

const mapSTP = ({entities, session}) => {
    return ({
        currentUser: entities.users[session.currentUserId],
        currentAccount: entities.accounts[session.accountId]
    })
}

const mapDTP = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapSTP, mapDTP)(Splash)

