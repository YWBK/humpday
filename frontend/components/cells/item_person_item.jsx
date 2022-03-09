import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ItemPersonItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: false}
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    render() {
        const { itemPerson, boardMembers, updateItemPerson } = this.props; 
        // debugger
        return (
            <li onClick={() => this.toggleActive()}>
                { itemPerson.userId ? boardMembers[itemPerson.userId].fullName : '-' }
                <ul className={this.state.active ? 'item-person-edit' : 'item-person-edit hidden'}>
                    { Object.values(boardMembers).map((boardMember, i) => (
                        <li 
                            key={i} 
                            className='item-person-edit-option'
                            onClick={() => {
                                const updatedItemPerson = {id: itemPerson.id, user_id: boardMember.id}
                                return updateItemPerson(updatedItemPerson);
                            }}>
                            {boardMember.fullName}
                        </li>
                    ))}
                    <li 
                        onClick={() => {
                            const updatedItemPerson = {id: itemPerson.id, user_id: null}
                            return updateItemPerson(updatedItemPerson);
                        }}>
                        -
                    </li>
                </ul>
            </li>
        )
    }
}

export default ItemPersonItem;