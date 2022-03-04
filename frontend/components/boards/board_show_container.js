import { connect } from 'react-redux';
import BoardShow from './board_show';
import { fetchUsers } from '../../actions/user_actions'; 

const mapSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId]
    const currentWorkspace = state.entities.workspaces[ownProps.match.params.workspaceId];
    const members = currentWorkspace ? currentWorkspace.users : [];
    return ({
        currentWorkspace: currentWorkspace,
        workspaceMembers: members,
        account: currentUser.account,
        accountMembers: state.entities.users,
    })
}

const mapDTP = dispatch => {
    return ({
        fetchUsers: () => dispatch(fetchUsers())
    })
}

export default connect(mapSTP, mapDTP)(BoardShow);
