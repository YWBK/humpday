import React from 'react';
export default class HomePage extends React.Component {

    componentDidMount() {
        if (this.props.match.params.accountName !== '') {
            // debugger
            this.props.fetchAccount(this.props.match.params.accountName)
        }
    }
    render() {
        return(
            <div>Home Page</div>
        )
    }
}