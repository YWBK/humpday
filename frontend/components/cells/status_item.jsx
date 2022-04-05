import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class StatusItem extends React.Component {
    constructor(props) {
        super(props);
        this.cellMenu = React.createRef();
        this.state = {active: false}
        this.handleOuterClickCell = this.handleOuterClickCell.bind(this);
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickCell);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickCell);
    }
    handleOuterClickCell(e) {
        if (
            this.cellMenu.current &&
            !this.cellMenu.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }
    }
    render() {
        const { status, updateStatus } = this.props; 
        const statusOptions = ['Working on it', 'Stuck', 'Done', '-'];

        return (
            <li onClick={() => this.toggleActive()} className='cell-edit-wrapper'>
                <span>{status.status}</span> 
                <ul 
                    ref={this.cellMenu }
                    className={this.state.active ? 'cell-edit' : 'cell-edit hidden'}>
                    { statusOptions.map((statusOption, i) => (
                        <li 
                            key={i} 
                            className='status-edit-option'
                            id={`status-edit-${i}`}
                            onClick={() => {
                                const updatedStatus = {id: status.id, status: statusOption}
                                return updateStatus(updatedStatus);
                            }}>
                            {statusOption}
                        </li>
                    ))}
                </ul>
            </li>
        )
    }
}

export default StatusItem;