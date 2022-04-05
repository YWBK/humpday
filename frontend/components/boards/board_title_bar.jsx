import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BoardTitleBar extends React.Component {
    constructor(props) {
        super(props)
        // debugger
        this.state = {
            boardName: props.currentBoard.boardName
        }
    }

    componentDidUpdate(prevProps) {
        const locationChanged = this.props.location.pathname !== prevProps.location.pathname;
        // debugger
        if (locationChanged) {
            // debugger
            this.setState({boardName: this.props.location.currentBoard.boardName});
        }
    }

    update(e) {
        this.setState({ boardName: e.currentTarget.value })
    }
    updateBoardName() {
        const { currentBoard, updateBoard } = this.props;
        const oldBoardName = currentBoard.boardName;
        if (oldBoardName === this.state.boardName) return null;
        if (this.state.boardName === '') return this.setState({ boardName: oldBoardName });

        const updatedBoard = {
            id: currentBoard.id,
            board_name: this.state.boardName,
        };
        updateBoard(updatedBoard);
    }
    onKeyDown(e) {
        if (e.key === "Enter") e.target.blur();
        if (e.key === 'Escape') {
            const oldBoardName = this.props.currentBoard.boardName;

            const cancelBoardRename = async () => {
                await this.setState({ boardName: oldBoardName });
                e.target.blur();                
            }
            cancelBoardRename();
        } 
    }
    render() {
        const { currentBoard, openModal } = this.props
        // debugger
        return (
            <div className='board-title-bar'>
                <input
                    type='text'
                    className='board-title'
                    value={this.state.boardName}
                    onChange={ e => this.update(e)} 
                    onBlur={ () => this.updateBoardName() }
                    onKeyDown={ e => this.onKeyDown(e) } 
                    />
                <button 
                    className='board-member-invite-btn' 
                    onClick={e => {
                        e.preventDefault()
                        return openModal('about')
                    }}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    <span>Invite / { Object.keys(currentBoard.members).length }</span>
                </button>
            </div>
        )
    }
}

export default withRouter(BoardTitleBar)