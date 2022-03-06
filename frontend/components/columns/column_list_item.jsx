import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ColumnListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    render() {
        const { col, itemCol } = this.props; 
        return (
            <li className='column-header'>
            {col.column_name}
            {/* <FontAwesomeIcon icon="fa-solid fa-minus" /> */}
            { col.id === itemCol.id ? null :
            <div className='col-edit-wrapper'>
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" className='col-edit-button' onClick={()=>this.toggleActive()} />
                <ul className={ this.state.active ? 'col-edit' : 'col-edit hidden' }>
                    <li>Rename</li>
                    <li>Delete</li>
                </ul>
            </div>
            }
        </li>
        )
    }
}

export default ColumnListItem