import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnListItem from '../columns/column_list_item';

class GroupListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false, addColActive: false }
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    toggleAddCol() {
        this.setState({ addColActive: !this.state.addColActive})
    }
    addCol(e, colName) {
        e.preventDefault();
        const { currentBoard, addColumn } = this.props;
        const column = {
            column_name: colName, 
            column_type: colName[0].toLowerCase() + colName.slice(1),
            board_id: currentBoard.id };
        addColumn(column);
    }
    
    render() {
        const { group, columns, deleteColumn, deleteGroup, items } = this.props; 
        // debugger
        return (
            <li key={group.id} className='group-list-item'>
                <FontAwesomeIcon 
                    icon="fa-solid fa-circle-chevron-down" 
                    className='group-edit-button' 
                    onClick={()=>this.toggleActive()} />
                { group.groupName}
                <div className='group-edit-wrapper'>
                        <ul className={ this.state.active ? 'group-edit' : 'group-edit hidden' }>
                            <li onClick={() => deleteGroup(group.id)}>
                                <span>Delete</span>
                                <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                            </li>
                        </ul>
                    </div>
                <ul className='column-headers'>
                    {columns.map(col => (
                        <ColumnListItem 
                            key={col.id} 
                            col={col} 
                            itemCol={columns[0]}
                            deleteColumn={deleteColumn} 
                        />
                    ))}
                    <li key='add-column' className='column-header' onClick={ () => this.toggleAddCol() }>
                        <FontAwesomeIcon icon={`fa-solid fa-${this.state.addColActive ? 'minus' : 'plus'}`} />
                        <ul className={ this.state.addColActive ? 'addColMenu' : 'addColMenu hidden'}>
                            <span>Add Column</span>
                            <li onClick={e => this.addCol(e, 'Person')}><FontAwesomeIcon icon="fa-solid fa-circle-user" />People</li>
                            <li onClick={e => this.addCol(e, 'Status')}><FontAwesomeIcon icon="fa-solid fa-bars-progress" />Status</li>
                            <li onClick={e => this.addCol(e, 'Date')}><FontAwesomeIcon icon="fa-solid fa-calendar" />Date</li>
                        </ul>
                    </li>
                </ul>
                <ul className='item-names'>
                    {items.map(item => (
                        <li key={item.id}>{item.itemName}</li>
                    ))}
                </ul>
            </li>
        )
    }
}

export default GroupListItem