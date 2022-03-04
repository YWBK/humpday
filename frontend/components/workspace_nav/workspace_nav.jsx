import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class WorkspaceNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { navActive: true, listActive: false };
        this.toggleNavClass = this.toggleNavClass.bind(this);
        this.toggleListClass = this.toggleListClass.bind(this);
    }
    componentDidMount() {
        this.props.fetchWorkspaces();
    }
    toggleNavClass() {
        this.setState({ navActive: !this.state.navActive })
    }
    toggleListClass() {
        // console.log('clicked')
        this.setState({ listActive: !this.state.listActive })
    }

    handleDelete(e) {
        e.stopPropagation();
        const { deleteWorkspace, currentAccount, currentWorkspaceId, history } = this.props;
        const acctName = currentAccount.account_name ? currentAccount.account_name : currentAccount.accountName;
        // debugger
        const deleteCurrentWorkspace = async () => {
            const response = await deleteWorkspace(currentWorkspaceId);
            const id = response.mainId;
            history.push({ pathname: `/${acctName}/workspaces/${id}` });
        };
        deleteCurrentWorkspace()
    }

    render() {
        const { workspaces, currentAccount, fetchWorkspace } = this.props;
        const location = this.props.location.pathname;
        const regex = /\/(workspaces|boards)/;
        // debugger
        const regexResult = location.match(regex) ? location.match(regex)[1] : null;
        if (!regexResult) {
            return null
        } else {
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
                                            pathname: `/${currentAccount.accountName ? currentAccount.accountName : currentAccount.account_name }/workspaces/${workspace.id}`, 
                                            workspaceMembers: workspace.members,
                                            currentAccountName: currentAccount.account_name
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
                            <div className='workspace-nav-delete' onClick={ (e) => this.handleDelete(e) }>
                                - Delete workspace
                            </div>
                        </div>
                    </div>
                    <button onClick={this.toggleNavClass} >
                        <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.navActive ? 'left' : 'right'}`} />
                    </button>
                </div>
            )
        }
    }
}