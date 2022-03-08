import React from 'react';
import ReactDOM from 'react-dom';
import library from './library/library';
import configureStore from './store/store';
import { getCurrentUser } from './util/session_api_util';
import { fetchWorkspaces, updateWorkspace } from './util/workspace_api_util';
import { addWorkspaceMember } from './util/workspace_member_api_util';
import { updateBoard } from './util/board_api_util';
import { deleteBoard } from './actions/board_actions';
// import { addColumn } from './util/column_api_util';
import { addColumn, deleteColumn } from './actions/column_actions';
import { addItem } from './actions/item_actions';
import { signup, login, logout } from './actions/session_actions';
import Root from './components/root';
// import logo from '../app/assets/images/logo.png';


document.addEventListener('DOMContentLoaded', () => {
    let store = configureStore();
    if (window.currentUser) {
        const preloadedState = {
          entities: {
            users: { [window.currentUser.id]: window.currentUser },
            accounts: { [window.currentUser.account.id]: window.currentUser.account }
          },
          session: { 
            currentUserId: window.currentUser.id,
            currentAccountId: window.currentUser.account.id
          }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    
    window.signup = signup;
    window.login = login;
    window.logout = logout;
    window.getCurrentUser = getCurrentUser;
    window.fetchWorkspaces = fetchWorkspaces;
    window.updateWorkspace = updateWorkspace;
    window.addWorkspaceMember = addWorkspaceMember;
    window.updateBoard = updateBoard;
    window.deleteBoard = deleteBoard;
    window.addColumn = addColumn;
    window.deleteColumn = deleteColumn;
    window.addItem = addItem;
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});
