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
        let statusClass;
        switch (status.status) {
            case 'Working on it':
                statusClass = 'working';
                break;
            case 'Stuck':
                statusClass = 'stuck';
                break;
            case 'Done':
                statusClass = 'done';
                break;
            case '-':
                statusClass = 'none';
                break;
        }
        return (
            <li onClick={() => this.toggleActive()}>
                <span className={statusClass}>{status.status}</span> 
                <ul 
                    ref={this.cellMenu }
                    className={this.state.active ? 'status-edit' : 'status-edit hidden'}>
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