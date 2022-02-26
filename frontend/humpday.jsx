import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
// import { signup, login, logout } from './util/session_api_util';
import { signup, login, logout } from './actions/session_actions';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    // debugger
    const store = configureStore();
    window.signup = signup;
    window.login = login;
    window.logout = logout;
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});
