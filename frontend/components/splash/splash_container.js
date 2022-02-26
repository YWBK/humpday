import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Splash from './splash';

const mapSTP = ({entities, session}) => {
    return ({
        currentUser: entities.users[session.currentUserId],
        currentAccount: entities.accounts[session.accountId]
    })
}

const mapDTP = dispatch => ({
    login: (user, accountName) => dispatch(login(user, accountName))
})

export default connect(mapSTP, mapDTP)(Splash)

