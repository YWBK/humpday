import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ItemListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false, 
        }
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }

    render() {
        const { item, deleteItem } = this.props;
        return (
            <li >
                <FontAwesomeIcon 
                    icon="fa-solid fa-circle-chevron-down" 
                    className='item-edit-button' 
                    onClick={()=>this.toggleActive()} />
                {item.itemName}
                <div className='item-edit-wrapper'>
                    <ul className={ this.state.active ? 'item-edit' : 'item-edit hidden' }>
                        <li onClick={() => deleteItem(item.id)}>
                            <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                            <span>Delete</span>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default ItemListItem;