import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';

export default class BoardShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, boardName: '' };
        // this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        // debugger
        this.props.fetchBoard(this.props.match.params.boardId, )
        // debugger
        this.props.fetchUsers();
        // debugger
        this.props.fetchWorkspaces();
        // debugger
    }

    render() {
        const { account, 
                workspaces, 
                currentWorkspace,
                boards,
                currentBoard, 
                openModal, 
                fetchUsers, 
                fetchWorkspace, 
                deleteWorkspace, 
                fetchBoard } = this.props
        // debugger
        if (boards) {
            return(
                <div className='' >
                    <SideNavContainer className='side-nav' />
                    <div className='main-content' >
                        <WorkspaceNav 
                            account={account}
                            workspaces={Object.values(workspaces)}
                            currentWorkspace={currentWorkspace}
                            boards={Object.values(boards)}
                            openModal={openModal}
                            fetchWorkspace={fetchWorkspace}
                            deleteWorkspace={deleteWorkspace}
                            fetchBoard={fetchBoard}
                        />
                        <div className='workspace-content' >
                            <div className='workspace-name'>
                                {currentBoard.boardName}
                            </div>
                            <div>
                            
                                {currentBoard.users.length} board members
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else {
            // debugger
            return null;
        }
    }
}