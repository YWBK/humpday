import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from "react-router-dom";
import { fetchUsers } from '../actions/user_actions';
import { fetchAccount } from '../actions/account_actions';

class Auth extends React.Component {
    // keep as class during dev for testing purposes
    render() {
        const { component: Component, path, loggedIn, exact, accountName} = this.props
        // debugger
        return (
            <Route
                path={path}
                exact={exact}
                render={props => {
                    if (!loggedIn) {
                        return (<Component {...props} />);
                    } else {
                        return (<Redirect to={`/${accountName}`} />);
                    };
                }}
            />
        );
    }
};


const Protected = ({ component: Component, path, loggedIn, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={props => {
                if (loggedIn) {
                    return (<Component {...props} />);  
                } else {
                    const accountName = location.hash[location.hash.length - 1] === '/' ? location.hash.slice(2, -1) : location.hash.slice(2)
                    return (<Redirect 
                            to={`/auth/login_humpday`} />);
                            // to={`/${accountName}/auth/login_humpday/email_password`} />);
                };
            }}
        />
    );
};

const mapSTP = (state, ownProps) => {
    // const accountName = state.session.currentAccountId ?
    //     state.entities.accounts[state.session.currentAccountId].accountName :
    //     '';
    // debugger
    const currentUser = state.entities.users[state.session.currentUserId];
    const accountName = currentUser ? currentUser.account.accountName : '';
    return {
        loggedIn: Boolean(state.session.currentUserId),
        accountName: accountName
    }
};

const mapDTP = dispatch => {
    return {
        getCurrentUser: userId => dispatch(getCurrentUser(userId))
    };  
};

export const AuthRoute = withRouter(connect(mapSTP, mapDTP)(Auth));
export const ProtectedRoute = withRouter(connect(mapSTP, null)(Protected));