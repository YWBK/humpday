import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNav from '../workspace_nav/workspace_nav';
import WorkspaceMembersList from './workspace_members_list';


export default class WorkspaceShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
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
        this.props.fetchUsers()
            .then(() => this.props.fetchBoards())
            .then(() => this.props.fetchWorkspace(this.props.match.params.workspaceId))
            .then(() => this.props.fetchWorkspaces());
    }

    componentDidUpdate(prevProps) {
        let currentWorkspaceName;
        const locationChanged = this.props.location.pathname !== prevProps.location.pathname;
        if (!this.state.workspaceName || locationChanged) {
            currentWorkspaceName = this.props.workspaces[this.props.match.params.workspaceId].workspaceName
            this.setState ({ workspaceName: currentWorkspaceName})
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    update(e) {
        this.setState({ workspaceName: e.currentTarget.value })
    }

    updateWorkspaceName() {
        const oldWorkspaceName = this.props.currentWorkspace.workspaceName;
        const workspaceId = this.props.currentWorkspace.id
        const workspace = Object.assign({}, { id: workspaceId , workspace_name: this.state.workspaceName });
        // debugger
        if (oldWorkspaceName !== this.state.workspaceName) {
            this.props.updateWorkspace(workspace);
        } else {
            null;
        }
    }

    render() {
        // debugger
        const { 
                // accountMembers, 
                workspaces, 
                // workspaceMembers, 
                boards, 
                currentUser,
                currentAccount,
                currentAccountUsers,
                currentWorkspace,
                openModal, 
                // fetchWorkspaces, 
                fetchWorkspace, 
                // fetchUsers, 
                deleteWorkspace, 
                addWorkspaceMember, 
                fetchBoard } = this.props;
            // debugger
        if (boards) {
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
                        />
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
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}