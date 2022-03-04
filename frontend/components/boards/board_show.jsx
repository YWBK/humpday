import React from 'react';

export default class BoardShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, boardName: '' };
        // this.toggleClass = this.toggleClass.bind(this);
    }
    render() {
        return(
            <div> Board Show Page </div>
        )
    }
}