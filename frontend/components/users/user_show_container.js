import { connect } from 'react-redux';
import UserShow from './user_show';

const mapSTP = (state, ownProps) => {
    const currentUser = state.entities.users[ownProps.match.params.userId]
    return ({
        currentUser: currentUser
    })
}

export default connect(mapSTP, null)(UserShow);
