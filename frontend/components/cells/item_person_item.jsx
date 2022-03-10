import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ItemPersonItem extends React.Component {
    constructor(props) {
        super(props);
        this.cellMenu = React.createRef();
        this.state = {active: false};
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
        const { itemPerson, boardMembers, updateItemPerson } = this.props; 
        // debugger
        return (
            <li onClick={() => this.toggleActive()}>
                { itemPerson.userId ? boardMembers[itemPerson.userId].fullName : '-' }
                <ul 
                    ref={this.cellMenu }
                    className={this.state.active ? 'cell-edit' : 'cell-edit hidden'}>
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
                        
                    </li>
                </ul>
            </li>
        )
    }
}

export default ItemPersonItem;