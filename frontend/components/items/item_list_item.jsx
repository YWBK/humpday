import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CellList from '../cells/cell_list';

class ItemListItem extends React.Component {
    constructor(props) {
        super(props);
        this.itemMenu = React.createRef();
        this.state = { 
            active: false, 
            renameActive: false,
            itemName: props.item.itemName,
            isDisabled: true
        }
        this.handleOuterClickItem = this.handleOuterClickItem.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickItem);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickItem);
    }
    handleOuterClickItem(e) {
        if (
            this.itemMenu.current &&
            !this.itemMenu.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }

    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    update(e) {
        this.setState({ itemName: e.currentTarget.value })
    }
    updateItemName() {
        const { item, updateItem } = this.props;
        const oldItemName = item.itemName;
        this.setState({ isDisabled: true });
        if (oldItemName === this.state.itemName) return null;
        if (this.state.itemName === '') return this.setState({ itemName: oldItemName });

        const updatedItem = {
            id: item.id,
            item_name: this.state.itemName,
            group_id: item.groupId
        };
        // debugger
        updateItem(updatedItem);
    }
    onKeyDown(e) {
        if (e.key === "Enter") {
            e.target.blur();
        }
    }

    render() {
        const { color, 
            currentAccountUsers, 
            currentBoard, 
            itemPeople, 
            statuses, 
            dueDates, 
            updateStatus, 
            updateItemPerson, 
            updateDueDate, 
            item, 
            columns, 
            deleteItem } = this.props;
        return (
            <li className='item-row'>
                <div className='item-edit-wrapper'>
                    <FontAwesomeIcon 
                        icon="fa-solid fa-caret-down" 
                        className={`item-edit-button ${color}`} 
                        onClick={()=>this.toggleActive()} />
                    <ul 
                        ref={this.itemMenu }
                        className={ this.state.active ? 'item-edit' : 'item-edit hidden' }>
                        <li onClick={() => deleteItem(item.id)}>
                            <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                            <span>Delete</span>
                        </li>
                    </ul>
                </div>
                <span className='item-name'>
                    <span className={`${color}-item item-flair`}> </span>
                    <div
                        onMouseEnter={() => this.setState({ renameActive: true }) }
                        onMouseLeave={() => this.setState({ renameActive: false}) } >
                        <input 
                            type='text'
                            className={`${color}`}
                            value={this.state.itemName}
                            onChange={ e => this.update(e)} 
                            onBlur={ () => this.updateItemName() }
                            onKeyDown={this.onKeyDown}
                            disabled={this.state.isDisabled} 
                            />
                        <span 
                            className={ this.state.renameActive ? 'item-rename' : 'item-rename hidden' } 
                            onClick={ () => this.setState({isDisabled: !this.state.isDisabled}) }>
                                Edit
                        </span>
                    </div>
                </span>
                <ul className='item-cells'>
                    { columns.map((col, i) => {
                        // debugger
                        return (<CellList 
                            key={col.id}
                            col={col}
                            item={item}
                            currentAccountUsers={currentAccountUsers} 
                            currentBoard={currentBoard}
                            itemPeople={itemPeople}
                            statuses={statuses}
                            dueDates={dueDates}
                            updateStatus={updateStatus}
                            updateItemPerson={updateItemPerson}
                            updateDueDate={updateDueDate} />
                            )})}
                    <li className='item-cell'> </li>
                </ul>
            </li>
        )
    }
}

export default ItemListItem;