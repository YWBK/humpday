import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ColumnHeaderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
    }
    toggleActive() {
        this.setState({active: !this.state.active});
    }
    render() {
        const { col, itemCol, deleteColumn, i } = this.props; 
        return (
            <li className={ i === 0 ? 'col-0' : 'col' }>
                <div className='column-header'>
                    {col.columnName}
                    { col.id === itemCol.id ? null : 
                        <FontAwesomeIcon 
                            icon="fa-solid fa-caret-down" 
                            className='col-edit-button' 
                            onClick={()=>this.toggleActive()} 
                        /> }
                </div>
                { col.id === itemCol.id ? null :
                    <div className='col-edit-wrapper'>
                        <ul className={ this.state.active ? 'col-edit' : 'col-edit hidden' }>
                            {/* <li>Rename</li> */}
                            <li onClick={() => deleteColumn(col.id)}>
                                <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                                <span>Delete</span>
                            </li>
                        </ul>
                    </div>
                }
        </li>
        )
    }
}

export default ColumnHeaderItem