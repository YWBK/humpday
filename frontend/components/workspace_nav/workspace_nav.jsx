import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WorkspaceNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { navActive: true, listActive: false };
        this.toggleNavClass = this.toggleNavClass.bind(this);
        this.toggleListClass = this.toggleListClass.bind(this);
    }
    componentDidMount() {
        this.props.fetchWorkspace(this.props.match.params.workspaceId);
    }
    toggleNavClass() {
        this.setState({ navActive: !this.state.navActive })
    }
    toggleListClass() {
        this.setState({ listActive: !this.state.listActive })
    }

    handleDelete(e) {
        e.stopPropagation();
        const { deleteWorkspace, account, currentWorkspace, history } = this.props;
        const acctName = account.account_name ? account.account_name : account.accountName;
        const deleteCurrentWorkspace = async () => {
            const response = await deleteWorkspace(currentWorkspace.id);
            const id = response.mainId;
            history.push({ pathname: `/${acctName}/workspaces/${id}`, currentWorkspace: currentWorkspace });
        };
        deleteCurrentWorkspace()
    }

    render() {
        const { workspaces, currentWorkspace, account, fetchWorkspace, boards } = this.props;
        const location = this.props.location.pathname;
        const regex = /\/(workspaces|boards)/;
        const regexResult = location.match(regex) ? location.match(regex)[1] : null;
        if (!regexResult) {
            return null
        } else if (boards) {
            // debugger
            return (
                <div className='workspace-nav-wrapper' onClick={ e => e.stopPropagation() }>
                    <div className={ this.state.navActive ? 'workspace-nav' : 'workspace-nav hidden' } >
                        <div className='workspace-nav-current' onClick={this.toggleListClass} >
                            My Workspaces
                            <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.listActive ? 'up' : 'down'}`} />    
                        </div>
                        <div className={ this.state.listActive ? 'workspace-nav-dropdown' : 'workspace-nav-dropdown hidden' }>
                            {/* <span>My Workspaces</span> */}
                            <ul>
                                { workspaces.map(workspace => {
                                    return (
                                        <Link 
                                        key={workspace.id} 
                                        to={{
                                            pathname: `/${account.accountName ? account.accountName : account.account_name }/workspaces/${workspace.id}`, 
                                            workspaceMembers: workspace.members,
                                            accountName: account.account_name
                                        }}
                                        onClick={ () => fetchWorkspace(workspace.id) }
                                        >
                                            <li key={workspace.id}>{workspace.workspaceName}</li>
                                    </Link>
                                            )
                                    })}
                            </ul>
                            <div className='workspace-nav-create' onClick={()=> this.props.openModal('workspace')}>
                                + Add workspace
                            </div>
                            { currentWorkspace === workspaces[0] ? '' :
                            <div className='workspace-nav-delete' onClick={ (e) => this.handleDelete(e) }>
                                 - Delete workspace
                            </div> }
                        </div>
                        <div className='boards-wrapper' >
                            My Boards
                            <div className='workspace-nav-create-board' onClick={()=> this.props.openModal('board')}>
                                + Add board
                            </div>
                            <div className='workspace-nav-boards' >
                                <ul>
                                { boards.map(board => {
                                    // debugger
                                    return (
                                        <li key={board.id}>{board.board_name}</li>
                                    )
                                })} 
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.toggleNavClass} >
                        <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.navActive ? 'left' : 'right'}`} />
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(WorkspaceNav);