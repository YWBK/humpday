import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';
import WorkspaceMembersList from './workspace_members_list';
import ColumnListItem from '../columns/column_list_item';
import GroupListItem from '../groups/group_list_item';


export default class MainShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        if (this.props.showType === 'workspace') {
            // debugger
            this.props.fetchUsers()
                .then(() => this.props.fetchBoards())
                .then(() => this.props.fetchWorkspace(this.props.match.params.workspaceId))
                .then(() => this.props.fetchWorkspaces());
        } else if (this.props.showType === 'board') {
            // debugger
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
            // debugger
            if (oldWorkspaceName !== this.state.workspaceName) {
                this.props.updateWorkspace(workspace);
            } else {
                null;
            }
        } else {
            // debugger
        }
    }

    addGroup(e) {
        e.preventDefault();
        const { currentBoard, addGroup } = this.props;
        const group = {
            group_name: 'New Group',
            board_id: currentBoard.id};
        // debugger
        addGroup(group);
    }

    render() {
        const { 
                showType,
                // accountMembers, 
                workspaces, 
                // workspaceMembers, 
                boards, 
                currentUser,
                currentAccount,
                currentAccountUsers,
                currentWorkspace,
                currentBoard,
                openModal, 
                // fetchWorkspaces, 
                fetchWorkspace, 
                // fetchUsers, 
                deleteWorkspace, 
                addWorkspaceMember, 
                fetchBoard, 
                updateBoard, 
                deleteBoard, 
                addColumn,
                deleteColumn,
                deleteGroup } = this.props;
            // debugger
        if (boards) {
            // debugger
            let content;
            if (showType === 'workspace') {
                // debugger
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
                        // fetchUsers={fetchUsers}
                    />
                </div> 
            } else if (showType === 'board') {
                // debugger
                const groups = Object.values(currentBoard.groups);
                const columns = Object.values(currentBoard.columns);
                // debugger
                content =
                <div>
                    {currentBoard.boardName}
                    <ul className='group-list'>
                        {groups.map(group => (
                            <GroupListItem 
                                key={group.id}
                                currentBoard={currentBoard}
                                group={group}
                                columns={columns}
                                addColumn={addColumn}
                                deleteColumn={deleteColumn}
                                deleteGroup={deleteGroup}
                            />
                        ))}
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