import React from 'react';
// import WorkspaceCreateModal from '../modal/modal';

export default class Workspace extends React.Component {
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
        console.log('clicked')
        this.setState({ listActive: !this.state.listActive })
    }


    render() {
        const { workspaces} = this.props;
        return (
            <div>
                <div className={ this.state.navActive ? 'workspace-nav' : 'workspace-nav-hidden' } >
                    <div className='workspace-nav-current' onClick={this.toggleListClass} >Main Workspace</div>
                    <div className={ this.state.listActive ? 'workspace-nav-dropdown' : 'workspace-nav-dropdown-hidden' }>
                        <span>My Workspaces</span>
                        <ul>
                            { workspaces.map(workspace => (
                                <li key={workspace.id}>{workspace.workspaceName}</li>
                            ))}
                        </ul>
                        <div className='workspace-nav-add' onClick={()=> this.props.openModal('workspace')}>
                            + Add workspace
                        </div>
                    </div>
                </div>
                <button onClick={this.toggleNavClass} >{ this.state.navActive ? '<' : '> ' }</button>
            </div>
        )
    }
}