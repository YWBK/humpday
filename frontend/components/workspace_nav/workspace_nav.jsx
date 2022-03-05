import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import WorkspaceListItem from '../workspaces/workspace_list_item';
import BoardItem from './board_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WorkspaceNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { navActive: true, listActive: false };
        this.toggleNavClass = this.toggleNavClass.bind(this);
        this.toggleListClass = this.toggleListClass.bind(this);
    }
    // componentDidMount() {
    //     // debugger
    //     if (this.props.currentWorkspace) return this.props.fetchWorkspace(this.props.currentWorkspace.id);
    //     this.props.fetchWorkspace(this.props.match.params.workspaceId);
    // }
    toggleNavClass() {
        this.setState({ navActive: !this.state.navActive })
    }
    toggleListClass() {
        this.setState({ listActive: !this.state.listActive })
    }

    handleDelete(e) {
        e.stopPropagation();
        const { 
            deleteWorkspace, 
            currentAccount, 
            currentWorkspace, 
            history 
        } = this.props;
        const acctName = currentAccount.account_name;  
        const deleteCurrentWorkspace = async () => {
            const response = await deleteWorkspace(currentWorkspace.id);
            const id = response.mainId;
            history.push({ 
                pathname: `/${acctName}/workspaces/${id}`, 
                currentWorkspace: currentWorkspace 
            });
        };
        deleteCurrentWorkspace()
    }

    render() {
        const { 
            workspaces, 
            boards, 
            currentAccount, 
            currentWorkspace, 
            fetchWorkspace, 
            fetchBoard,
            updateBoard, 
            deleteBoard } = this.props;
        const location = this.props.location.pathname;
        const regex = /\/(workspaces|boards)/;
        const regexResult = location.match(regex) ? location.match(regex)[1] : null;
        if (!regexResult) {
            return null
        } else if (boards) {
            const filteredBoards = boards.filter(board => currentWorkspace.boards.find(({ id }) => board.id === id));
            // debugger
            return (
                <div className='workspace-nav-wrapper' onClick={ e => e.stopPropagation() }>
                    <div className={ this.state.navActive ? 'workspace-nav' : 'workspace-nav hidden' } >
                        <div className='workspace-nav-current' onClick={this.toggleListClass} >
                            My Workspaces
                            <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.listActive ? 'up' : 'down'}`} />    
                        </div>
                        <div className={ this.state.listActive ? 'workspace-nav-dropdown' : 'workspace-nav-dropdown hidden' }>
                            <ul>
                                { workspaces.map(workspace => {
                                    return (
                                        <WorkspaceListItem 
                                            key={workspace.id} 
                                            workspace={workspace} 
                                            currentAccount={currentAccount} 
                                            fetchWorkspace={fetchWorkspace} 
                                        />
                                    )
                                })}
                            </ul>
                            <div className='workspace-nav-create' onClick={()=> this.props.openModal('workspace')}>
                                + Add workspace
                            </div>
                            { currentWorkspace === workspaces[0] ? '' :
                            <div className='workspace-nav-delete' onClick={ (e) => this.handleDelete(e) }>
                                 - Delete workspace
                            </div> }
                        </div>

                        <div className='boards-wrapper' >
                            My Boards
                            <div className='workspace-nav-create-board' onClick={()=> this.props.openModal('board')}>
                                + Add board
                            </div>
                            <div className='workspace-nav-boards' >
                                <ul>
                                { filteredBoards.map(board => {
                                    return (
                                        < BoardItem 
                                            key={board.id} 
                                            board={board} 
                                            currentAccount={currentAccount} 
                                            currentWorkspace={currentWorkspace} 
                                            fetchBoard={fetchBoard}
                                            updateBoard={updateBoard}
                                            deleteBoard={deleteBoard}                                            
                                        />
                                        // <div key={board.id} className='board-item-wrapper'>
                                        //     { this.state.boardNameEdit ?
                                        //         <div>BOARD NAME</div> :
                                        //         <Link
                                        //             className='board-item-link'
                                        //             to={{
                                        //                 pathname: `/${currentAccount.account_name }/boards/${board.id}`,
                                        //                 currentAccount: currentAccount,
                                        //                 currentWorkspace: currentWorkspace,
                                        //                 currentBoard: board
                                        //             }}
                                        //             onClick={ () => fetchBoard(board.id)} >
                                        //             <li>{board.boardName}</li>
                                        //         </Link>

                                        //     }
                                        //     <div className='board-item-u-d-wrapper'>
                                        //         <FontAwesomeIcon icon="fa-solid fa-pencil" className='board-item-u-d' onClick={this.toggleBoardNameEdit}/>
                                        //         <FontAwesomeIcon icon="fa-solid fa-trash" className='board-item-u-d' />
                                        //     </div>
                                        // </div>
                                    )
                                })} 
                                </ul>
                            </div>
                        </div>

                    </div>
                    <button onClick={this.toggleNavClass} >
                        <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.navActive ? 'left' : 'right'}`} />
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(WorkspaceNav);