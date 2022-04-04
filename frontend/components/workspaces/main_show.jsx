import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';
import WorkspaceMembersList from './workspace_members_list';
import GroupListItem from '../groups/group_list_item';
import BoardTitleBar from '../boards/board_title_bar';


export default class MainShow extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = { 
            active: true, 
            searchStr: '',
            workspaceName: '                              ' };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        if (this.props.showType === 'workspace') {
            this.props.fetchUsers()
                .then(() => this.props.fetchBoards())
                .then(() => this.props.fetchWorkspace(this.props.match.params.workspaceId))
                .then(() => this.props.fetchWorkspaces());
        } else if (this.props.showType === 'board') {
            this.props.fetchUsers()
                .then(() => this.props.fetchBoard(this.props.match.params.boardId))
                .then((board) => {
                    return this.props.fetchWorkspace(board.board.workspace.id) })
                .then(() => { 
                    return this.props.fetchBoards()})
                .then(() => this.props.fetchWorkspaces());
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.showType === 'workspace') {
            let currentWorkspaceName;
            const locationChanged = this.props.location.pathname !== prevProps.location.pathname;
            if (this.state.workspaceName === '                              ' || locationChanged) {
                currentWorkspaceName = this.props.workspaces[this.props.match.params.workspaceId].workspaceName
                this.setState ({ workspaceName: currentWorkspaceName})
            }
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    search(e) {
        this.update('searchStr', e);
    }
    
    update(field, e) {
        this.setState({ [field]: e.currentTarget.value })
    }

    updateWorkspaceName() {
        if ( this.props.showType !== 'workspace') return null;

        const oldWorkspaceName = this.props.currentWorkspace.workspaceName;
        if (oldWorkspaceName === this.state.workspaceName) return null;
        if (this.state.workspaceName === '') return this.setState({ workspaceName: oldWorkspaceName });
            
        const workspaceId = this.props.currentWorkspace.id
        const workspace = Object.assign({}, { id: workspaceId , workspace_name: this.state.workspaceName });
        this.props.updateWorkspace(workspace);
    }
    onKeyDown(e) {
        if (e.key === "Enter") {
            e.target.blur();
        }
    }

    addGroup(e) {
        e.preventDefault();
        const { currentBoard, addGroup } = this.props;
        const group = {
            group_name: 'New Group',
            board_id: currentBoard.id};
        addGroup(group);
    }

    render() {
        const { 
                showType,
                workspaces, 
                boards, 
                currentUser,
                currentAccount,
                currentAccountUsers,
                currentWorkspace,
                currentBoard,
                openModal, 
                fetchWorkspace, 
                deleteWorkspace, 
                addWorkspaceMember, 
                fetchBoard, 
                updateBoard, 
                deleteBoard, 
                addColumn,
                deleteColumn,
                updateGroup,
                deleteGroup, 
                addItem, 
                updateItem,
                deleteItem,
                updateStatus, 
                updateItemPerson, 
                updateDueDate } = this.props;
        if (boards) {
            let content;
            if (showType === 'workspace') {
                content = 
                <div className='workspace-content' >
                    <div className='workspace-cover'></div>
                    <div className='workspace-name'>
                        <input 
                            type='text' 
                            value={this.state.workspaceName} 
                            onChange={ e => this.update('workspaceName', e) }
                            onBlur={ () => this.updateWorkspaceName() }
                            onKeyDown={this.onKeyDown}
                            onClick={ e => e.stopPropagation() } />
                    </div>
                    <WorkspaceMembersList 
                        currentAccount={currentAccount}
                        currentAccountUsers={currentAccountUsers}
                        currentWorkspace={currentWorkspace}
                        addWorkspaceMember={addWorkspaceMember}
                    />
                </div> 
            } else if (showType === 'board') {
                // const groups = Object.values(currentBoard.groups);
                let groups = this.state.searchStr
                    ? Object
                        .values(currentBoard.groups)
                        .filter(group => group.groupName.toLowerCase()
                            .includes(this.state.searchStr.toLowerCase()))
                    : Object.values(currentBoard.groups);
                // debugger
                let searchedMembers = this.state.searchStr
                    ? Object
                        .values(currentBoard.members)
                        .filter(member => member.fullName.toLowerCase()
                            .includes(this.state.searchStr.toLowerCase()))
                        .map(member => member.id)
                    : [];
                let searchedItemPeople = this.state.searchStr
                    ? Object
                        .values(currentBoard.itemPeople)
                        .filter(itemPerson => searchedMembers
                            .includes(itemPerson.userId))
                    : [];
                let searchedStatuses = this.state.searchStr
                    ? Object
                        .values(currentBoard.statuses)
                        .filter(status => status.status.toLowerCase()
                            .includes(this.state.searchStr.toLowerCase()))
                    : [];
                let searchedDates =  this.state.searchStr
                    ? Object
                        .values(currentBoard.dueDates)
                        .filter(dueDate => dueDate.date
                            .includes(this.state.searchStr))
                    : [];
                let searchedCells = [...searchedItemPeople, ...searchedStatuses, ...searchedDates]

                let searchedItems = this.state.searchStr 
                    ? Object
                        .values(currentBoard.items)
                        .filter(item => searchedCells
                            .map(i => i.itemId).includes(item.id))
                    : [];

                if (searchedItems.length > 0) {
                    let itemGroupIds = searchedCells
                        .map(cell => cell.groupId);
                    groups = Object
                        .values(currentBoard.groups)
                        .filter(group => itemGroupIds
                            .includes(group.id))
                }
                // debugger

                const columns = Object.values(currentBoard.columns);
                // debugger
                content =
                <div className='board-content'>
                    <BoardTitleBar 
                        currentAccountUsers={currentAccountUsers} 
                        currentBoard={currentBoard} 
                        openModal={openModal} 
                        updateBoard={updateBoard} />
                    <div className='board-menu-bar'>
                        <div className='new-item-split-btn' >
                            <button 
                                className='new-item-btn'
                                style={{borderRadius: '0.2em 0 0 0.2em'}}>
                                    New Item
                            </button>
                            <div className='new-item-dropdown'>
                                <button 
                                    className='new-item-btn' 
                                    style={{
                                        borderLeft: '1px solid rgba(45, 103, 202, 255)',
                                        borderRadius: '0 0.2em 0.2em 0'}}>
                                            <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                </button>
                                <ul className='new-item-dropdown-content'>
                                    <li>New group of Items</li>
                                </ul>
                            </div>
                        </div>
                        <input
                            type='text'
                            className='searchBar'
                            placeholder='Search'
                            value={this.state.searchStr}
                            onChange={e => this.search(e)}
                        />
                    </div>
                    <ul className='group-list'>
                        {groups.map(group => {
                            // debugger
                            const items = currentBoard.items 
                                ? Object.values(currentBoard.items)
                                    .filter(item => searchedItems.length > 0
                                        ? item.groupId === group.id
                                            && Object.values(searchedItems)
                                                .map(i => i.id)
                                                .includes(item.id)
                                        : item.groupId === group.id )
                                : null;

                            const itemPeople = currentBoard.itemPeople 
                                ? Object.values(currentBoard.itemPeople)
                                    .filter(itemPerson => searchedItems.length > 0
                                        ? itemPerson.groupId === group.id
                                            && Object.values(searchedItems)
                                                .map(i => i.id)
                                                .includes(itemPerson.itemId)
                                        : itemPerson.groupId === group.id ) 
                                : null;

                            const statuses = currentBoard.statuses 
                                ? Object.values(currentBoard.statuses)
                                    .filter(status => searchedItems.length > 0 
                                        ? status.groupId === group.id 
                                            && Object.values(searchedItems)
                                                .map(i => i.id)
                                                .includes(status.itemId) 
                                        : status.groupId === group.id ) 
                                : null;

                            const dueDates = currentBoard.dueDates 
                                ? Object.values(currentBoard.dueDates)
                                    .filter(dueDate => searchedItems.length > 0
                                        ? dueDate.groupId === group.id
                                            && Object.values(searchedItems)
                                                .map(i => i.id)
                                                .includes(dueDate.itemId)
                                        : dueDate.groupId === group.id ) 
                                : null;
                            // debugger
                            return (
                                <GroupListItem 
                                    key={group.id}
                                    searchStr={this.state.searchStr}
                                    showType={showType}
                                    currentAccountUsers={currentAccountUsers}
                                    currentBoard={currentBoard}
                                    group={group}
                                    columns={columns}
                                    items={items}
                                    itemPeople={itemPeople}
                                    statuses={statuses}
                                    dueDates={dueDates}
                                    addColumn={addColumn}
                                    deleteColumn={deleteColumn}
                                    updateGroup={updateGroup}
                                    deleteGroup={deleteGroup}
                                    addItem={addItem}
                                    updateItem={updateItem}
                                    deleteItem={deleteItem}
                                    updateStatus={updateStatus}
                                    updateItemPerson={updateItemPerson}
                                    updateDueDate={updateDueDate}
                                />
                            )
                        })}
                        <button className='add-group-btn' onClick={e => this.addGroup(e)}>
                            <FontAwesomeIcon icon='fa-solid fa-plus' />
                            <span>Add new group</span>
                        </button>
                    </ul>
                </div>
            } else {
                content =
                <div>A SHOW PAGE</div>
            }

            return (
                // <div className='' onClick={ () => this.updateWorkspaceName() } >
                <div className='' >
                    <SideNavContainer className='side-nav' />
                    <div className='main-content' >
                        <WorkspaceNav 
                            workspaces={Object.values(workspaces)}
                            boards={Object.values(boards)}
                            currentAccount={currentAccount}
                            currentWorkspace={currentWorkspace}
                            openModal={openModal}
                            fetchWorkspace={fetchWorkspace}
                            deleteWorkspace={deleteWorkspace}
                            fetchBoard={fetchBoard}
                            updateBoard={updateBoard}
                            deleteBoard={deleteBoard}
                        />
                        { content }
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}