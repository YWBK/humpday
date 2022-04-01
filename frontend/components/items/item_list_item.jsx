import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CellList from '../cells/cell_list';

class ItemListItem extends React.Component {
    constructor(props) {
        super(props);
        this.itemRow = React.createRef();
        this.itemMenu = React.createRef();
        this.itemMenuButton = React.createRef();
        this.itemNameInp = React.createRef();
        this.state = { 
            active: false, 
            renameActive: false,
            itemActive: false,
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
        if (
            this.itemMenuButton.current &&
            !this.itemMenuButton.current.contains(e.target) &&
            !this.itemRow.current.contains(e.target)
        ) {
            this.setState({
                itemActive: false
            })
        }
        
    }
    toggleActive() {
        this.setState({active: !this.state.active });
    }
    update(e) {
        this.setState({ itemName: e.currentTarget.value })
    }
    openItemRename() {
        const openRenameInput = async () => {
            await this.setState({ active: false, isDisabled: !this.state.isDisabled});
            this.itemNameInp.current.focus();
        }
        openRenameInput();
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
        updateItem(updatedItem);
    }
    onKeyDown(e) {
        if (e.key === "Enter") e.target.blur()
        if (e.key === 'Escape') {
            const oldItemName = this.props.item.itemName;
            this.setState({ itemName: oldItemName, isDisabled: true })
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
            <li 
                ref={this.itemRow}
                className='item-row'
                onMouseEnter={() => this.setState({ renameActive: true, itemActive: true }) }
                onMouseLeave={() => this.setState({ renameActive: false, itemActive: this.state.active ? true : false }) } >
                <div className='item-edit-wrapper' >
                    <div
                        ref={this.itemMenuButton}
                        className={ this.state.itemActive
                            ? `item-edit-button ${color}`
                            : `item-edit-button hidden`} 
                        onClick={()=>this.toggleActive()}>
                            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                    </div>
                    <ul 
                        ref={this.itemMenu }
                        className={ this.state.active ? 'item-edit' : 'item-edit hidden' }>
                        <li 
                            className='group-item-edit-option'
                            onClick={() => this.openItemRename() } >
                                    <FontAwesomeIcon icon='fa-solid fa-pencil' />
                                    <span>Rename Item</span>
                        </li>
                        <li 
                            className='group-item-edit-option' 
                            onClick={() => deleteItem(item.id)}>
                                <FontAwesomeIcon icon="fa-solid fa-trash" />
                                <span>Delete</span>
                        </li>
                    </ul>
                </div>
                <span className='item-name'>
                    <div className={`${color}-item item-flair`}> </div>
                    <input 
                        ref={this.itemNameInp}
                        type='text'
                        className='item-name-inp'
                        value={this.state.itemName}
                        onChange={ e => this.update(e)} 
                        onBlur={ () => this.updateItemName() }
                        onKeyDown={ e => this.onKeyDown(e) }
                        disabled={this.state.isDisabled} 
                        />
                    <span 
                        className={ this.state.renameActive ? 'item-rename' : 'item-rename hidden' } 
                        onClick={ () => this.openItemRename() } >
                            Edit
                    </span>
                </span>
                <ul className='item-cells'>
                    { columns.map((col, i) => {
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