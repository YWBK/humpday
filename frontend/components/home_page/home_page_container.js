import { connect } from 'react-redux';
import HomePage from './home_page';

const mapSTP = (state) => {
    const currentUser = state.entities.users[state.session.currentUserId];
    return ({
        currentUser: currentUser
    })
}

export default connect(mapSTP, null)(HomePage);

