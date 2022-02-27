import React from 'react';
export default class HomePage extends React.Component {

    componentDidMount() {
        if (this.props.match.params.accountName !== '') {
            this.props.fetchAccountByName(this.props.match.params.accountName)
        }
    }
    render() {
        return(
            <div>Home Page
                <div className='side-nav'>
                    <button onClick={() => this.props.logout()}>Log Out</button>
                </div>
            </div>

        )
    }
}