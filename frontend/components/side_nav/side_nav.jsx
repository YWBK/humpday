import React from 'react';
import { Link } from 'react-router-dom';

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
        this.toggleClass = this.toggleClass.bind(this);
    }

    userInitials = string => {
        const words = string.split(' ')
        if (words.length < 2) {
            return words[0][0].toUpperCase();
        } else {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    toggle

    render() {
        const { mainWorkspace, account } = this.props
        return (
            <div className='side-nav'>
                <div className='side-nav-home-btn'>
                    <Link to='/'>Home Page</Link>
                </div>

                <div className='side-nav-workspaces-btn'>
                    <Link to={`/${account.account_name}/workspaces/${mainWorkspace.id}`}>Workspaces</Link>
                </div>

                <div className='side-nav-linked-in'>
                    <a href="https://github.com/YWBK/humpday" target="_blank" >Github</a>
                </div>

                <div className='side-nav-linked-in'>
                    <a href="https://www.linkedin.com/in/bill-kim-88987a42/" target="_blank" >LinkedIn</a>
                </div>

                <div className='side-nav-linked-in'>
                    <a href="https://angel.co/u/yong-woo-kim-1" target="_blank" >AngelList</a>
                </div>

                <div className='side-nav-user-initials' onClick={this.toggleClass}>
                    {this.userInitials(this.props.currentUser.fullName)}
                </div>
                
                <div className={ this.state.active ? 'side-nav-user-options' : 'side-nav-user-options-hidden' } >
                    <div className='side-nav-user-options-user-show'>
                        <Link to={`/${account.account_name}/users/${this.props.currentUser.id}`}>My profile</Link>
                    </div>
                    <div className='side-nav-user-options-users-index'>
                        <Link to ={`/${account.account_name}/users`}>Team</Link>
                    </div>
                    <button onClick={() => this.props.logout()}>Log out</button>
                </div>
            </div>
        )
    }
}