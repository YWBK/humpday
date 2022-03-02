import * as AccountApiUtil from '../util/account_api_util';
export const REC_CURR_ACCT = 'REC_CURR_ACCT';

const recCurrAcct= account => {
    return ({
        type: REC_CURR_ACCT,
        account
    })
}

export const fetchAccount = accountId => dispatch => {
    return(
        AccountApiUtil.fetchAccount(accountId)
            .then(account => dispatch(recCurrAcct(account)))
    )
}
export const fetchAccountByName = accountName => dispatch => {
    return(
        AccountApiUtil.fetchAccountByName(accountName)
            .then(account => dispatch(recCurrAcct(account)))
    )
}