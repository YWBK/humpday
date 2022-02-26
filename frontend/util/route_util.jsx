import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from "react-router-dom";
import { fetchAccount } from '../actions/account_actions';

class Auth extends React.Component {
    // keep as class during dev for testing purposes
    render() {
        const { component: Component, path, loggedIn, exact, fetchAccount, accountId, accountName } = this.props
        return (
            <Route
                path={path}
                exact={exact}
                render={props => {
                    if (!loggedIn) {
                        return (<Component {...props} />);
                    } else {
                        fetchAccount(accountId);
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
                    // debugger
                    return (<Redirect 
                            to={`/${accountName}/auth/login_humpday/email_password`} />);
                };
            }}
        />
    );
};

const mapSTP = (state, ownProps) => {
    const accountId = state.session.currentUserId ?
        state.entities.users[state.session.currentUserId].accountId :
        null;

    const accountName = state.entities.accounts[accountId] ?
        state.entities.accounts[accountId].accountName :
        '';

    return {
        loggedIn: Boolean(state.session.currentUserId),
        accountId: accountId,
        accountName: accountName
    }
};

const mapDTP = dispatch => {
    return {
        fetchAccount: accountId => dispatch(fetchAccount(accountId))
    };  
};

export const AuthRoute = withRouter(connect(mapSTP, mapDTP)(Auth));
export const ProtectedRoute = withRouter(connect(mapSTP, null)(Protected));