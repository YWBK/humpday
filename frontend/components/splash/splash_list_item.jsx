import React from 'react'

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
        const { item, id } = this.props;
        return (
            <li 
                className='splash-checkbox-container'
                id={`splash-checkbox-${id}`}
                onClick={this.handleClick}>
                <span className='splash-checkbox-name'>{item}</span>
                <input type='checkbox' />
                <span className='checkmark'></span>
            </li>

        )
    }
}; 


export default SplashListItem;