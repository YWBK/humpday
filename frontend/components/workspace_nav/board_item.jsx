import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import WorkspaceListItem from '../workspaces/workspace_list_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BoardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { boardName: '', boardNameEdit: false };
        this.toggleBoardNameEdit = this.toggleBoardNameEdit.bind(this);
    }
    componentDidUpdate(prevProps) {
        let currentBoardName;
        const locationChanged = this.props.location.pathname !== prevProps.location.pathname;
        if (!this.state.boardName || locationChanged) {
            currentBoardName = this.props.board.boardName
            this.setState ({ boardName: currentBoardName})
        }
    }
    toggleBoardNameEdit() {
        this.setState({ boardNameEdit: !this.state.boardNameEdit })
    }
    update(e) {
        this.setState({ boardName: e.currentTarget.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        const { board, updateBoard } = this.props;
        const oldBoardName = board.boardName;
        if (oldBoardName !== this.state.boardName) {
            const updatedBoard = Object.assign({}, { id: board.id, board_name: this.state.boardName });
            updateBoard(updatedBoard);
        }
        this.toggleBoardNameEdit();
    }
    handleDelete(e) {
        e.preventDefault();
        const { deleteBoard, board, currentWorkspace, currentAccount, history } = this.props

        const deleteCurrentBoard = async() => {
            await history.push({
                pathname: `/${currentAccount.account_name}/workspaces/${currentWorkspace.id}`,
            })
            deleteBoard(board.id);
        }
        deleteCurrentBoard();
    }

    render() {
        const { 
            board, 
            currentAccount, 
            currentWorkspace, 
            fetchBoard, 
            deleteBoard } = this.props;
        return (
            <div className='board-item-wrapper'>
            { this.state.boardNameEdit ?
                <form onKeyPress={ e => e.key === 'Enter' ? this.handleSubmit(e) : null }>
                    <input type='text' value={this.state.boardName} onChange={e => this.update(e)} />
                    <FontAwesomeIcon icon="fa-regular fa-circle-check" onClick={e => this.handleSubmit(e)}/>
                    <FontAwesomeIcon icon="fa-regular fa-circle-xmark" onClick={this.toggleBoardNameEdit} />
                </form> :
                <Link
                    className='board-item-link'
                    to={{
                        pathname: `/${currentAccount.account_name }/boards/${board.id}`,
                        currentAccount: currentAccount,
                        currentWorkspace: currentWorkspace,
                        currentBoard: board
                    }}
                    onClick={ () => fetchBoard(board.id)} >
                    <li>{board.boardName}</li>
                </Link>
            }
                <div className='board-item-u-d-wrapper'>
                    <FontAwesomeIcon icon="fa-solid fa-pencil" className='board-item-u-d' onClick={this.toggleBoardNameEdit}/>
                    <FontAwesomeIcon icon="fa-solid fa-trash" className='board-item-u-d' onClick={e => this.handleDelete(e)} />
                </div>
            </div>
        )
    }
}

export default withRouter(BoardItem);