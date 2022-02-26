import * as AccountApiUtil from '../util/account_api_util';
export const REQ_CURR_ACCT = 'REQ_CURR_ACCT';

const reqCurrAcct= account => {
    return ({
        type: REQ_CURR_ACCT,
        account
    })
}

export const fetchAccount = accountId => dispatch => {
    return(
        AccountApiUtil.fetchAccount(accountId)
            .then(account => dispatch(reqCurrAcct(account)))
    )
}
export const fetchAccountByName = accountName => dispatch => {
    return(
        AccountApiUtil.fetchAccountByName(accountName)
            .then(account => dispatch(reqCurrAcct(account)))
    )
}