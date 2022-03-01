import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import accountsReducer from './accounts_reducer';
import workspacesReducer from './workspaces_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    accounts: accountsReducer,
    workspaces: workspacesReducer
})

export default entitiesReducer;