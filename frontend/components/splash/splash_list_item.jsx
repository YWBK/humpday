import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SplashListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isChecked: false }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault;
        this.setState({ isChecked: !this.state.isChecked });
    }
    render() {
        const icons = ['shapes', 'server', 'code', 'bullhorn', 'chart-gantt', 'chart-line', 'check', 'user-group', 'gears']
        const { item, id } = this.props;
        return (
            <li 
                className={ this.state.isChecked ? 'splash-checkbox-container checked' : 'splash-checkbox-container' }
                id={`splash-checkbox-${id}`}
                onClick={this.handleClick}>
                <FontAwesomeIcon className='splash-checkbox-icon' icon={`fa-solid fa-${icons[id - 1]}`} size='2x' />
                <span className='splash-checkbox-name'>{item}</span>
                <input type='checkbox' />
                <span className='checkmark'></span>
            </li>

        )
    }
}; 


export default SplashListItem;