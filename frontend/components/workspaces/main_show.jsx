import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';
import WorkspaceMembersList from './workspace_members_list';
import ColumnListItem from '../columns/column_list_item';


export default class MainShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '', addColActive: false };
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        // const fetchInfo = async() => {
        //     await this.props.fetchUsers();
        //     await this.props.fetchBoards();
        //     await this.props.fetchWorkspace(this.props.match.params.workspaceId)
        //     await this.props.fetchWorkspaces();
        // }
        // fetchInfo();
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
    toggleAddCol() {
        this.setState({ addColActive: !this.state.addColActive})
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

    addCol(e, colName) {
        e.preventDefault();
        const { currentBoard, addColumn } = this.props;
        // const colType = colName[0].toLowerCase() + colName.slice(1);
        const column = {
            column_name: colName, 
            column_type: colName[0].toLowerCase() + colName.slice(1),
            board_id: currentBoard.id };
        addColumn(column);
    }

    render() {
        // debugger
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
                deleteColumn } = this.props;
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
                const columns = Object.values(currentBoard.columns)
                content =
                <div>
                    {currentBoard.boardName}
                    {currentBoard.groups.map(group => (
                        <div key={group.id}>
                            { group.group_name}
                            <ul className='column-headers'>
                                {columns.map(col => (
                                    <ColumnListItem 
                                        key={col.id} 
                                        col={col} 
                                        itemCol={columns[0]}
                                        deleteColumn={deleteColumn} 
                                    />
                                    // <li key={col.id} className='column-header'>
                                    //     {col.columnName}
                                    //     {/* <FontAwesomeIcon icon="fa-solid fa-minus" /> */}
                                    //     <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                    // </li>
                                ))}
                                <li key='add-column' className='column-header' onClick={ () => this.toggleAddCol() }>
                                    <FontAwesomeIcon icon={`fa-solid fa-${this.state.addColActive ? 'minus' : 'plus'}`} />
                                    <ul className={ this.state.addColActive ? 'addColMenu' : 'addColMenu hidden'}>
                                        <span>Add Column</span>
                                        <li onClick={e => this.addCol(e, 'Person')}><FontAwesomeIcon icon="fa-solid fa-circle-user" />People</li>
                                        <li onClick={e => this.addCol(e, 'Status')}><FontAwesomeIcon icon="fa-solid fa-bars-progress" />Status</li>
                                        <li onClick={e => this.addCol(e, 'Date')}><FontAwesomeIcon icon="fa-solid fa-calendar" />Date</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    ))}
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
                        {/* <div className='workspace-content' >
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
                        </div> */}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}