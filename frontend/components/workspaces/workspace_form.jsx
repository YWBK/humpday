import React from 'react';
import { Redirect } from 'react-router-dom';

export default class WorkspaceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            workspaceName: 'New workspace',
            workspaceOwnerId: this.props.currentUserId,
            accountId: this.props.currentAccountId,
            redirect: null
        };
    }
    update(e) {
        this.setState({ workspaceName: e.target.value })
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.closeModal();
    }
    handleSubmit(e) {
        e.preventDefault();
        const workspace = Object.assign({}, {
            workspace_name: this.state.workspaceName, 
        });
        const createWorkspace = async () => {
            const response = await this.props.processForm(workspace);
            const id = response.workspace.id;
            // debugger
            this.props.history.push({pathname: `/${this.props.currentAccountName}/workspaces/${id}` })
            this.props.closeModal();
        };
        createWorkspace()
    }

    render() {
        return(
            <div className='workspace-modal'>
                <div className='modal-title'>Create Workspace</div>
                <div className='modal-form-wrapper'>
                    <form onKeyPress={ (e) => { e.key === 'Enter' ? this.handleSubmit(e) : null }}>
                        <label>
                            <span>{ this.state.workspaceName[0] }</span>
                            Workspace name
                            <input type="text" value={ this.state.workspaceName } onChange={ (e) => this.update(e) } />
                        </label>
                        <div className='modal-cancel-btn'>
                            <button onClick={ (e) => this.handleCancel(e) }>Cancel</button>
                        </div>
                        <div className='modal-submit-btn'>
                            <button onClick={ (e) => this.handleSubmit(e)}>Create Workspace</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

// export default withRouter(WorkspaceForm);