import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ColumnHeaderItem extends React.Component {
    constructor(props) {
        super(props);
        this.colEdit = React.createRef();
        this.state = { active: false }
        this.handleOuterClickCol = this.handleOuterClickCol.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClickCol);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClickCol);
    }
    handleOuterClickCol(e) {
        if (
            this.colEdit.current &&
            !this.colEdit.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }
    }

    toggleActive() {
        this.setState({active: !this.state.active});
    }
    render() {
        const { col, deleteColumn } = this.props; 
        return (
            <li key={col.id} className='column-header'>
                <span>{col.columnName}</span>
                <FontAwesomeIcon 
                    icon="fa-solid fa-caret-down" 
                    className='col-edit-button' 
                    onClick={()=>this.toggleActive()} 
                />
                <ul ref={this.colEdit} className={ this.state.active ? 'col-menu' : 'col-menu hidden' }>
                    <li onClick={() => deleteColumn(col.id)}>
                        <FontAwesomeIcon icon="fa-solid fa-trash" className='column-delete' />
                        <span>Delete</span>
                    </li>
                </ul>
            </li>
        )
    }
}

export default ColumnHeaderItem