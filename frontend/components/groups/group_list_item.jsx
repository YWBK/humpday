import React from 'react';
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnHeaderItem from '../columns/column_header_item';
import ItemListItem from '../items/item_list_item';
import CellList from '../cells/cell_list';

class GroupListItem extends React.Component {
    constructor(props) {
        super(props);
        this.groupMenu = React.createRef();
        this.colMenu = React.createRef();
        this.groupNameInp = React.createRef();
        this.state = { 
            active: false, 
            addColActive: false,
            groupName: props.group.groupName,
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
    update(field, e) {
        this.setState({ [field]: e.currentTarget.value })
    }
    updateGroupName() {
        const { currentBoard, group, updateGroup } = this.props;
        const oldGroupName = group.groupName;
        if (oldGroupName === this.state.groupName) return null;
        if (this.state.groupName === '') return this.setState({ groupName: oldGroupName });

        const updatedGroup = {
            id: group.id,
            group_name: this.state.groupName,
            board_id: currentBoard.id
        };
        updateGroup(updatedGroup);
    }
    onKeyDown(e) {
        if (e.key === "Enter") e.target.blur();
        if (e.key === 'Escape') {
            const oldGroupName = this.props.group.groupName;

            const cancelGroupRename = async () => {
                await this.setState({ groupName: oldGroupName });
                e.target.blur();                
            }
            cancelGroupRename();
        } 
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
            updateItem,
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
                                <li 
                                    className='group-item-edit-option'
                                    onClick={() => {
                                        this.setState({ active: false })
                                        this.groupNameInp.current.focus()} } >
                                            <FontAwesomeIcon icon='fa-solid fa-pencil' />
                                            <span>Rename Group</span>
                                </li>    
                                <li 
                                    className='group-item-edit-option'
                                    onClick={() => deleteGroup(group.id)}>
                                        <FontAwesomeIcon icon="fa-solid fa-trash"/>
                                        <span>Delete</span>
                                </li>
                        </ul>
                    </div>
                    <span className={`group-name`}>
                        <input 
                            ref={this.groupNameInp}
                            type='text' 
                            className={`${group.groupColor}`} 
                            value={this.state.groupName} 
                            onChange={ e => this.update('groupName', e)} 
                            onBlur={ () => this.updateGroupName() }
                            onKeyDown={ e => this.onKeyDown(e) }
                            />
                    </span>
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
                
                <ul className='item-row-wrapper'>
                    {items ? items.map (item => {
                        return (
                            <ItemListItem 
                                key={item.id}
                                columns={columns}
                                items={items}
                                item={item} 
                                updateItem={updateItem}
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
                        <form onKeyPress={ e => e.key === 'Enter' ? this.handleSubmit(e) : null} >
                            <input 
                                type='text' 
                                placeholder='+ Add Item' 
                                value={this.state.itemName} 
                                onChange={e => this.update('itemName', e)} 
                                onBlur={e => this.handleSubmit(e)} />
                        </form>
                    </li>
                </ul>
            </li>
        )
    }
}

export default withRouter(GroupListItem);