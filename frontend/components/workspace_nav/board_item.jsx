import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import WorkspaceListItem from '../workspaces/workspace_list_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BoardItem extends React.Component {
    constructor(props) {
        super(props);
        this.boardMenu = React.createRef();
        this.boardRename = React.createRef();
        this.state = { boardName: '', boardNameEdit: false, boardMenu: false };
        this.toggleBoardNameEdit = this.toggleBoardNameEdit.bind(this);
        this.handleOuterClickBoard = this.handleOuterClickBoard.bind(this);

    }
    componentDidUpdate(prevProps) {
        let currentBoardName;
        const locationChanged = this.props.location.pathname !== prevProps.location.pathname;
        if (!this.state.boardName || locationChanged) {
            currentBoardName = this.props.board.boardName
            this.setState ({ boardName: currentBoardName})
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickBoard);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickBoard);
    }
    handleOuterClickBoard(e) {
        if (
            this.boardMenu.current &&
            !this.boardMenu.current.contains(e.target)
        ) {
            this.setState({
                boardMenu: false,
            })
        }
        if (
            this.boardRename.current &&
            !this.boardRename.current.contains(e.target)
        ) {
            this.handleSubmit(e);
        }
    }

    toggleBoardNameEdit() {
        this.setState({ boardNameEdit: !this.state.boardNameEdit, boardMenu: false })
    }
    toggleBoardMenu() {
        this.setState({ boardMenu: !this.state.boardMenu })
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
                pathname: `/${currentAccount.accountName}/workspaces/${currentWorkspace.id}`,
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
                <form ref={this.boardRename} onKeyPress={ e => e.key === 'Enter' ? this.handleSubmit(e) : null }>
                    <input type='text' value={this.state.boardName} onChange={e => this.update(e)} />
                </form> :
                <Link
                    className='board-item-link'
                    to={{
                        pathname: `/${currentAccount.accountName }/boards/${board.id}`,
                        currentAccount: currentAccount,
                        currentWorkspace: currentWorkspace,
                        currentBoard: board
                    }}
                    onClick={ () => fetchBoard(board.id)} >
                    <li className='board-item-link-wrapper'>{board.boardName}</li>
                </Link>
            }
                <div className='board-menu-btn'>
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" onClick={() => this.toggleBoardMenu()}/>
                </div>
                <ul className={this.state.boardMenu ? 'board-menu' : 'board-menu hidden'} ref={this.boardMenu}>
                    <li onClick={this.toggleBoardNameEdit}>
                        <span>
                            <FontAwesomeIcon icon="fa-solid fa-pencil" className='board-item-u-d' />
                        </span>
                        Rename Board
                    </li>
                    <li onClick={e => this.handleDelete(e)}>
                        <span>
                            <FontAwesomeIcon icon="fa-solid fa-trash" className='board-item-u-d'  />
                        </span>
                        Delete
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(BoardItem);