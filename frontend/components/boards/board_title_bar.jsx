import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BoardTitleBar extends React.Component {
    render() {
        const { currentBoard } = this.props
        // debugger
        return (
            <div className='board-title-bar'>
                {currentBoard.boardName}
                <button 
                    className='board-member-invite-btn' 
                    onClick={e => {
                        e.preventDefault()
                        
                    }}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    <span>Invite / { Object.keys(currentBoard.members).length }</span>
                </button>
            </div>
        )
    }
}

export default BoardTitleBar