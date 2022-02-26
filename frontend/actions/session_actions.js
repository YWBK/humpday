import * as SessionApiUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_BY_EMAIL = 'RECEIVE_USER_BY_EMAIL';

const receiveCurrentUser = currentUser => {
    return ({
        type: RECEIVE_CURRENT_USER,
        currentUser
    })
}
const receiveUserByEmail = () => {
    return ({
        type: RECEIVE_USER_BY_EMAIL
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
                currentUser => dispatch(receiveCurrentUser(currentUser)), 
                errors => dispatch(receiveErrors(errors))
            )
    );
}
export const findUserByEmail = email => {
    return (
        SessionApiUtil.findUserByEmail(email)
            .then(
                () => dispatch(receiveUserByEmail()),
                errors => dispatch(receiveErrors(errors))
            )
    )
}
export const login = (user, accountName) => dispatch => {
    return (
        SessionApiUtil.login(user, accountName)
            .then(
                currentUser => dispatch(receiveCurrentUser(currentUser)), 
                errors => dispatch(receiveErrors(errors))
            )
    );        
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




