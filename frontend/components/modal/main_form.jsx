import React from 'react';
import { Redirect } from 'react-router-dom';

export default class MainForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            formName: `New ${props.formType}`,
            workspaceOwnerId: this.props.currentUserId,
            accountId: this.props.currentAccountId,
        };
    }
    update(e) {
        this.setState({ formName: e.target.value })
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.closeModal();
    }
    handleSubmit(e) {
        e.preventDefault();
        const { currentAccountName, formType, currentWorkspaceId } = this.props
        const k = formType + '_name';
        const newObj = Object.assign({}, {
            [k]: this.state.formName, 
        });
        if (formType === 'board') {
            newObj.workspace_id = currentWorkspaceId;
        }
        const createBoard = async () => {
            const response = await this.props.processForm(newObj);
            const id = response[formType].id
            this.props.formType === 'board' ? await this.props.fetchWorkspaces() : null;
            this.props.history.push({pathname: `/${currentAccountName}/${formType}s/${id}` })
            this.props.closeModal();
        };
        createBoard()
    }

    render() {
        const capitalize = str => {
            return (str[0].toUpperCase() + str.slice(1));
        }
        const formName = capitalize(this.props.formType);
        return(
            <div className='workspace-modal'>
                <div className='modal-title'>Create {formName}</div>
                <div className='modal-form-wrapper'>
                    <form className='modal-form' onKeyPress={ (e) => { e.key === 'Enter' ? this.handleSubmit(e) : null }}>
                        {/* <label> */}
                            {formName} name
                            <input type="text" value={ this.state.formName } onChange={ (e) => this.update(e) } />
                        {/* </label> */}
                        {/* <div className='modal-cancel-btn'> */}
                            <div className='modal-btns'>
                                <button className='modal-cancel-btn' onClick={ (e) => this.handleCancel(e) }>Cancel</button>
                                <button className='modal-submit-btn'onClick={ (e) => this.handleSubmit(e)}>Create {formName}</button>
                            </div>
                        {/* </div> */}
                        {/* <div className='modal-submit-btn'> */}
                        {/* </div> */}
                    </form>
                </div>
            </div>
        )
    }
}