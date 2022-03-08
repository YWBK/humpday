import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnListItem from '../columns/column_list_item';
import ItemListItem from '../items/item_list_item';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';

class GroupListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false, 
            addColActive: false,
            itemName: ''
        }
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
    update(e) {
        this.setState({itemName: e.currentTarget.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.itemName) return null;
        const { group, addItem } = this.props;
        const item = Object.assign({}, {item_name: this.state.itemName, group_id: group.id})
        addItem(item)
            .then(() => this.setState({itemName: ''}));
    }
    

    render() {
        const { 
            group, 
            columns, 
            items, 
            itemPeople,
            statuses,
            dueDates,
            currentAccountUsers,
            deleteColumn, 
            deleteGroup, 
            deleteItem } = this.props; 
        // debugger


        return (
            <li key={group.id} className='group-list-item'>
                <FontAwesomeIcon 
                    icon="fa-solid fa-square-caret-down" 
                    className='group-edit-button' 
                    onClick={()=>this.toggleActive()} />
                { group.groupName}
                <div className='group-edit-wrapper'>
                        <ul className={ this.state.active ? 'group-edit' : 'group-edit hidden' }>
                            <li onClick={() => deleteGroup(group.id)}>
                                <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                                <span>Delete</span>
                            </li>
                        </ul>
                    </div>
                <ul className='column-headers'>
                    {columns.map((col, i) => {
                        let content;
                        switch(col.columnType) {
                            case 'item':
                                content = <ul className='item-names'>
                                    { items ? items.map(item => (
                                        <ItemListItem key={item.id} item={item} deleteItem={deleteItem} />
                                    )) : null }
                                    <li className='add-item'>
                                        <form>
                                            <input type='text' placeholder='+ Add Item' value={this.state.itemName} onChange={e => this.update(e)} />
                                            <FontAwesomeIcon icon="fa-regular fa-circle-check" onClick={e => this.handleSubmit(e)}/>
                                            <FontAwesomeIcon icon="fa-regular fa-circle-xmark" onClick={() => this.setState({itemName: ''})} />
                                        </form>
                                    </li>
                                </ul>;
                                break;
                            case 'person':
                                content = <ul className='item-people'>
                                    { itemPeople ? itemPeople.map(itemPerson => (
                                        <li key={itemPerson.id}>{currentAccountUsers[itemPerson.userId].fullName}</li>
                                    )): null }
                                </ul>
                                break;
                            case 'status':
                                content = <ul className='status'>
                                    { statuses ? statuses.map(status => (
                                        <li key={status.id}>{status.status}</li>
                                    )): null }
                                </ul>
                                break;
                            case 'date':
                                content = <ul className='due-date'>
                                    { dueDates ? dueDates.map(dueDate => (
                                        <li key={dueDate.id}>{dueDate.date}</li>
                                    )): null }
                                </ul>
                                break;
                            default:
                                return null;
                        }
                        return (
                            <div key={col.id} className='column-wrapper'>
                                <ColumnListItem
                                    col={col} 
                                    itemCol={columns[0]}
                                    deleteColumn={deleteColumn}
                                    i={i} />
                                { content }
                            </div>
                        )
                    })}
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
            </li>
        )
    }
}

export default GroupListItem