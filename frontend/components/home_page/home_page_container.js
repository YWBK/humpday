import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchAccount } from '../../actions/account_actions'

const mapSTP = (state) => {
    return ({})
}

const mapDTP = dispatch => {
    return ({
        fetchAccount: accountName => dispatch(fetchAccount(accountName))
    })
}

export default connect(mapSTP, mapDTP)(HomePage);

