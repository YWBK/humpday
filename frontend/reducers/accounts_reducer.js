import { REC_CURR_ACCT } from '../actions/account_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const accountsReducer = (state = {}, action) => {
    Object.freeze({}, state);
    let nextState = Object.assign({}, state);
    // debugger
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState[action.currentAccount.id] = action.currentAccount;
            return nextState;
        case REC_CURR_ACCT:
            nextState[action.account.id] = action.account;
            return nextState;
        default:
            return state;
    }
}

export default accountsReducer;