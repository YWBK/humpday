import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BoardTitleBar extends React.Component {
    render() {
        const { currentBoard, openModal } = this.props
        // debugger
        return (
            <div className='board-title-bar'>
                <span className='board-title'>
                    {currentBoard.boardName}
                </span>
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

export default BoardTitleBar