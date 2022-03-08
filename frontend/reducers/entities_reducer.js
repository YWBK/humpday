import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import accountsReducer from './accounts_reducer';
import workspacesReducer from './workspaces_reducer';
import boardsReducer from './boards_reducer';
import columnsReducer from './columns_reducer';
import groupsReducer from './groups_reducer';
import itemsReducer from './items_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    accounts: accountsReducer,
    workspaces: workspacesReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    groups: groupsReducer,
    items: itemsReducer
})

export default entitiesReducer;