import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';
import WorkspaceMembersList from './workspace_members_list';
import GroupListItem from '../groups/group_list_item';


export default class MainShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
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
            if (!this.state.workspaceName || locationChanged) {
                currentWorkspaceName = this.props.workspaces[this.props.match.params.workspaceId].workspaceName
                this.setState ({ workspaceName: currentWorkspaceName})
            }
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    update(e) {
        this.setState({ workspaceName: e.currentTarget.value })
    }

    updateWorkspaceName() {
        if (this.props.showType === 'workspace') {
            const oldWorkspaceName = this.props.currentWorkspace.workspaceName;
            const workspaceId = this.props.currentWorkspace.id
            const workspace = Object.assign({}, { id: workspaceId , workspace_name: this.state.workspaceName });
            if (oldWorkspaceName !== this.state.workspaceName) {
                this.props.updateWorkspace(workspace);
            } else {
                null;
            }
        } else {
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
                deleteGroup, 
                addItem, 
                deleteItem } = this.props;
        if (boards) {
            let content;
            if (showType === 'workspace') {
                content = 
                <div className='workspace-content' >
                    <div className='workspace-cover'>COVER IMAGE TO GO HERE</div>
                    <div className='workspace-name'>
                        <input 
                            type='text' 
                            value={this.state.workspaceName} 
                            onChange={ e => this.update(e) } 
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
                const groups = Object.values(currentBoard.groups);
                const columns = Object.values(currentBoard.columns);

                content =
                <div>
                    {currentBoard.boardName}
                    <ul className='group-list'>
                        {groups.map(group => {
                            // debugger
                            const items = currentBoard.items ? Object.values(currentBoard.items).filter(item => item.groupId === group.id) : null;
                            const itemPeople = currentBoard.itemPeople ? Object.values(currentBoard.itemPeople).filter(itemPerson => itemPerson.groupId === group.id) : null;
                            const statuses = currentBoard.statuses ? Object.values(currentBoard.statuses).filter(status => status.groupId === group.id) : null;
                            const dueDates = currentBoard.dueDates ? Object.values(currentBoard.dueDates).filter(dueDate => dueDate.groupId === group.id) : null;
                            // debugger
                            return (
                                <GroupListItem 
                                    key={group.id}
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
                                    deleteGroup={deleteGroup}
                                    addItem={addItem}
                                    deleteItem={deleteItem}
                                />
                            )
                        })}
                        <button className='add-group-btn' onClick={e => this.addGroup(e)}>
                            <FontAwesomeIcon icon='fa-solid fa-plus' />
                            <span>Add Group</span>
                        </button>
                    </ul>
                </div>
            } else {
                content =
                <div>A SHOW PAGE</div>
            }

            return (
                <div className='' onClick={ () => this.updateWorkspaceName() } >
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