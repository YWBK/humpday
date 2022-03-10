import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnHeaderItem from '../columns/column_header_item';
import ItemListItem from '../items/item_list_item';
import CellList from '../cells/cell_list';

class GroupListItem extends React.Component {
    constructor(props) {
        super(props);
        this.groupMenu = React.createRef();
        this.colMenu = React.createRef();
        this.state = { 
            active: false, 
            addColActive: false,
            itemName: ''
        }
        this.handleOuterClickTable = this.handleOuterClickTable.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickTable);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickTable);
    }
    handleOuterClickTable(e) {
        if (
            this.groupMenu.current &&
            !this.groupMenu.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }
        if (
            this.colMenu.current &&
            !this.colMenu.current.contains(e.target)
        ) {
            this.setState({
                addColActive: false,
            })
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
            currentBoard,
            deleteColumn, 
            deleteGroup, 
            deleteItem, 
            updateStatus, 
            updateItemPerson, 
            updateDueDate } = this.props; 

        return (
            <li key={group.id} className='group-list-item'>
                <div className='group-header'>
                    <div className='group-edit-wrapper'>
                        <FontAwesomeIcon 
                            icon="fa-solid fa-caret-down" 
                            className={`group-edit-button ${group.groupColor}`} 
                            onClick={()=>this.toggleActive()} />
                        <ul 
                            className={ this.state.active ? 'group-edit' : 'group-edit hidden' }
                            ref={this.groupMenu}>
                            <li onClick={() => deleteGroup(group.id)}>
                                <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                                <span>Delete</span>
                            </li>
                        </ul>
                    </div>
                    <span className='group-name'>{ group.groupName}</span>
                    <ul className='column-headers'>
                        { columns.slice(1).map((col, i) => (
                            <ColumnHeaderItem 
                                key={col.id}
                                col={col}
                                deleteColumn={deleteColumn} />
                        ))}
                        <li key='add-column' className='column-header' id='column-add' onClick={ () => this.toggleAddCol() }>
                            <FontAwesomeIcon icon={`fa-solid fa-${this.state.addColActive ? 'minus' : 'plus'}`} />
                            <ul 
                                className={ this.state.addColActive ? 'col-menu' : 'col-menu hidden'}
                                ref={this.colMenu}>
                                <span>Add Column</span>
                                <li onClick={e => this.addCol(e, 'Person')}><FontAwesomeIcon icon="fa-solid fa-circle-user" />People</li>
                                <li onClick={e => this.addCol(e, 'Status')}><FontAwesomeIcon icon="fa-solid fa-bars-progress" />Status</li>
                                <li onClick={e => this.addCol(e, 'Date')}><FontAwesomeIcon icon="fa-solid fa-calendar" />Date</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                
                <ul>
                    {items ? items.map (item => {
                        return (
                            <ItemListItem 
                                key={item.id}
                                columns={columns}
                                items={items}
                                item={item} 
                                deleteItem={deleteItem} 
                                color={group.groupColor}
                                currentAccountUsers={currentAccountUsers} 
                                currentBoard={currentBoard}
                                itemPeople={itemPeople}
                                statuses={statuses}
                                dueDates={dueDates}
                                updateStatus={updateStatus}
                                updateItemPerson={updateItemPerson}
                                updateDueDate={updateDueDate}  />
                        )
                    }) : null}
                    <li className='add-item'>
                        <form>
                            <input type='text' placeholder='+ Add Item' value={this.state.itemName} onChange={e => this.update(e)} />
                            <FontAwesomeIcon icon="fa-regular fa-circle-check" onClick={e => this.handleSubmit(e)}/>
                            <FontAwesomeIcon icon="fa-regular fa-circle-xmark" onClick={() => this.setState({itemName: ''})} />
                        </form>
                    </li>
                </ul>
            </li>
        )
    }
}

export default GroupListItem