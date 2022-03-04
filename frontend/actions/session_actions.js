import * as SessionApiUtil from '../util/session_api_util';
import * as AccountApiUtil from '../util/account_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
import { REC_CURR_ACCT } from './account_actions';

const receiveCurrentUser = (currentUser, currentAccount) => {
    return ({
        type: RECEIVE_CURRENT_USER,
        currentUser,
        currentAccount
    })
}
const logoutCurrentUser = () => {
    return ({
        type: LOGOUT_CURRENT_USER,
    })
}
const receiveErrors = errors => {
    return({
        type: RECEIVE_SESSION_ERRORS,
        errors
    })
}

export const signup = (user, accountName) => dispatch => {
    // debugger
    return (
        SessionApiUtil.signup(user, accountName)
            .then(
                // currentUser => dispatch(receiveCurrentUser(currentUser)), 
                currentUser => (
                    AccountApiUtil.fetchAccount(currentUser.accountId)
                        .then(currentAccount => {
                            dispatch(receiveCurrentUser(currentUser, currentAccount));
                        })
                ),
                errors => dispatch(receiveErrors(errors))
            )
    );
}
export const login = (user, accountName) => dispatch => {
    // debugger
    return (
        SessionApiUtil.login(user, accountName)
            .then(
                currentUser => (
                        AccountApiUtil.fetchAccount(currentUser.accountId)
                            .then(currentAccount => {
                                dispatch(receiveCurrentUser(currentUser, currentAccount));
                            })
                ),
                errors => dispatch(receiveErrors(errors))
            )
    )        
}    
export const logout = () => dispatch => {
    return (
        SessionApiUtil.logout()
            .then(
                () => dispatch(logoutCurrentUser()), 
                errors => dispatch(receiveErrors(errors))
            )
    );        
}    

export const getCurrentUser = currentUserId => dispatch => {
    return (
        SessionApiUtil.getCurrentUser(currentUserId)
            .then(
                currentUser => dispatch(receiveCurrentUser(currentUser)),
                errors => dispatch(receiveErrors(errors))
            )
    )
}

