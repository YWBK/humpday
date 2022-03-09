import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class StatusItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: false}
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    render() {
        const { status, updateStatus } = this.props; 
        const statusOptions = ['Working on it', 'Stuck', 'Done', '-'];
        return (
            <li onClick={() => this.toggleActive()}>
                {status.status}
                <ul className={this.state.active ? 'status-edit' : 'status-edit hidden'}>
                    { statusOptions.map((statusOption, i) => (
                        <li 
                            key={i} 
                            className='status-edit-option'
                            onClick={() => {
                                const updatedStatus = {id: status.id, status: statusOption}
                                return updateStatus(updatedStatus);
                            }}
                        >
                            {statusOption}
                        </li>
                    ))}
                </ul>
            </li>
        )
    }
}

export default StatusItem;