import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import WorkspaceListItem from '../workspaces/workspace_list_item';
import BoardItem from './board_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WorkspaceNav extends React.Component {
    constructor(props) {
        super(props);
        this.workspaceList = React.createRef();
        this.state = { navActive: true, listActive: false };
        this.toggleNavClass = this.toggleNavClass.bind(this);
        this.toggleListClass = this.toggleListClass.bind(this);
        this.handleOuterClickWorkspace = this.handleOuterClickWorkspace.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickWorkspace);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickWorkspace);
    }
    handleOuterClickWorkspace(e) {
        if (
            this.workspaceList.current &&
            !this.workspaceList.current.contains(e.target)
        ) {
            this.setState({
                listActive: false,
            })
        }
    }

    toggleNavClass() {
        this.setState({ navActive: !this.state.navActive })
    }
    toggleListClass() {
        this.setState({ listActive: !this.state.listActive })
    }

    handleDelete(e) {
        e.stopPropagation();
        const { 
            deleteWorkspace, 
            currentAccount, 
            currentWorkspace, 
            history 
        } = this.props;
        const acctName = currentAccount.accountName;  
        const deleteCurrentWorkspace = async () => {
            const response = await deleteWorkspace(currentWorkspace.id);
            const id = response.mainId;
            history.push({ 
                pathname: `/${acctName}/workspaces/${id}`, 
                currentWorkspace: currentWorkspace 
            });
        };
        deleteCurrentWorkspace()
    }

    render() {
        const { 
            workspaces, 
            boards, 
            currentAccount, 
            currentWorkspace, 
            fetchWorkspace, 
            fetchBoard,
            updateBoard, 
            deleteBoard } = this.props;
        const location = this.props.location.pathname;
        const regex = /\/(workspaces|boards)/;
        const regexResult = location.match(regex) ? location.match(regex)[1] : null;
        if (!regexResult) {
            return null
        } else if (boards) {
            const filteredBoards = boards.filter(board => currentWorkspace.boards.find(({ id }) => board.id === id));
            return (
                <div className='workspace-nav-wrapper' onClick={ e => e.stopPropagation() }>
                    <div className={ this.state.navActive ? 'workspace-nav' : 'workspace-nav hidden' } >
                        <div className='workspace-nav-current'  >
                            <span>Workspace</span>
                            <div className='workspace-nav-selector' onClick={this.toggleListClass}>
                                <span>{ currentWorkspace ? currentWorkspace.workspaceName : 'Main Workspace' }</span>
                                <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.listActive ? 'up' : 'down'}`} />    
                            </div>
                        </div>
                        <div 
                            className={ this.state.listActive ? 'workspace-nav-dropdown' : 'workspace-nav-dropdown hidden' } 
                            ref={this.workspaceList}
                            onClick={() => this.toggleListClass()}>
                            <span>My workpaces</span>
                            <ul>
                                { workspaces.map(workspace => {
                                    return (
                                        <WorkspaceListItem 
                                            key={workspace.id} 
                                            workspace={workspace} 
                                            currentAccount={currentAccount} 
                                            fetchWorkspace={fetchWorkspace} 
                                        />
                                    )
                                })}
                            </ul>
                            <div className='workspace-nav-c-r' onClick={()=> this.props.openModal('workspace')}>
                                + Add workspace
                            </div>
                            { currentWorkspace === workspaces[0] ? '' :
                            <div className='workspace-nav-c-r' onClick={ (e) => this.handleDelete(e) }>
                                 - Delete workspace
                            </div> }
                        </div>

                        <div className='boards-wrapper' >
                            <div className='workspace-nav-create-board' onClick={()=> this.props.openModal('board')}>
                                + Add board
                            </div>
                            {/* <div className='workspace-nav-boards' > */}
                                <ul className='workspace-nav-boards'>
                                { filteredBoards.map(board => {
                                    return (
                                        < BoardItem 
                                            key={board.id} 
                                            board={board} 
                                            currentAccount={currentAccount} 
                                            currentWorkspace={currentWorkspace} 
                                            fetchBoard={fetchBoard}
                                            updateBoard={updateBoard}
                                            deleteBoard={deleteBoard}                                            
                                        />
                                    )
                                })} 
                                </ul>
                            {/* </div> */}
                        </div>

                    </div>
                    <button onClick={this.toggleNavClass} >
                        <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.navActive ? 'left' : 'right'}`} className='workspace-arrow' />
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(WorkspaceNav);