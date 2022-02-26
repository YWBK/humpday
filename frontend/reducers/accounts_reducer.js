import { REQ_CURR_ACCT } from '../actions/account_actions';

const accountsReducer = (state = {}, action) => {
    Object.freeze({}, state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case REQ_CURR_ACCT:
            nextState[action.account.id] = action.account;
            return nextState;
        default:
            return state;
    }
}

export default accountsReducer;