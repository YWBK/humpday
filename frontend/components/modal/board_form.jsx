import React from 'react';
import { withRouter } from 'react-router-dom';

class BoardForm extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = {
            boardName: 'New Board',
            boardOwnerId: props.curentUserId,
            workspaceId: props.workspaceId
        };
    }
    update(e) {
        this.setState({ boardName: e.target.value })
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.closeModal();
    }
    handleSubmit(e) {
        e.preventDefault();
        const board = Object.assign({}, {
            board_name: this.state.boardName,
            board_owner_id: this.state.boardOwnerId,
            workspace_id: this.state.workspaceId 
        });
        const currentAccountName = this.props.location.pathname.match(/[^/]+/)[0];
        // debugger
        // const { currentAccountName } = this.props
        // const createWorkspace = async () => {
        //     const response = await this.props.processForm(board);
        //     const id = response.board.id;
        //     // debugger
        //     this.props.history.push({pathname: `/${currentAccountName}/boards/${id}` })
        //     this.props.closeModal();
        // };
        // createWorkspace()
        
    }

    render() {
        return(
            <div className='board-modal'>
                <div className='modal-title'>Create Board</div>
                <div className='modal-form-wrapper'>
                    <form onKeyPress={ (e) => { e.key === 'Enter' ? this.handleSubmit(e) : null }}>
                        <label>
                            Board name
                            <input type="text" value={ this.state.boardName } onChange={ (e) => this.update(e) } />
                        </label>
                        <div className='modal-cancel-btn'>
                            <button onClick={ (e) => this.handleCancel(e) }>Cancel</button>
                        </div>
                        <div className='modal-submit-btn'>
                            <button onClick={ (e) => this.handleSubmit(e)}>Create Board</button>
                        </div>
                    </form>
                </div>
            </div>
        )    
    } 
}

export default withRouter(BoardForm)