import React from 'react';
import DatePicker from 'react-datepicker';

class DueDateItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dueDate: new Date(this.props.dueDate.date) };
    }
    setDueDate(date) {
        const { dueDate } = this.props;
        const newDateStr = date.toISOString();     
        const updatedDate = Object.assign({}, {id: dueDate.id, date: newDateStr});
        this.props.updateDueDate(updatedDate)
            .then(this.setState({ dueDate: date }));
    }
    render() {
        return(
            <DatePicker 
                className='date-picker'
                selected={this.state.dueDate}
                value={this.state.dueDate}
                onChange={date => this.setDueDate(date)}
            />
        )
    }
}

export default DueDateItem