import * as AccountApiUtil from '../util/account_api_util';
export const REQ_CURR_ACCT = 'REQ_CURR_ACCT';

const reqCurrAcct= account => {
    return ({
        type: REQ_CURR_ACCT,
        account
    })
}

export const fetchAccount = accountName => dispatch => {
    return(
        AccountApiUtil.fetchAccount(accountName)
            .then(account => dispatch(reqCurrAcct(account)))
    )
}