import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { fetchWorkspace } from '../../util/workspace_api_util';

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
        this.toggleClass = this.toggleClass.bind(this);
    }
    
    userInitials = string => {
        const words = string.split(' ')
        if (words.length < 2) {
            const firstLetter = words[0][0];
            return (
                <div className='userInitials'>
                    <FontAwesomeIcon icon={`fa-solid fa-${firstLetter}`} size='2x' />
                </div>
            ) 
        } else {
            // return (words[0][0] + words[1][0]).toUpperCase();
            const firstLetter = words[0][0];
            const secondLetter = words[1][0];
            return (
                <div className='userInitials'>
                    <FontAwesomeIcon icon={`fa-solid fa-${firstLetter}`} size='2x' />
                    <FontAwesomeIcon icon={`fa-solid fa-${secondLetter}`} size='2x' />
                </div>
            )
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    }

    render() {
        const { 
            currentUser, 
            mainWorkspace, 
            account, 
            fetchWorkspace } = this.props
        // debugger
        if (currentUser) {
            return (
                <div className='side-nav'>
                    <div className='side-nav-btn-wrapper'>
                        <Link to='/' className='side-nav-btn'>
                            <FontAwesomeIcon icon="fa-solid fa-house" size='2x' />
                        </Link>
                    </div>
    
                    <div className='side-nav-btn-wrapper'>
                        <Link 
                            className='side-nav-btn'
                            to={{
                                pathname:`/${account.account_name}/workspaces/${mainWorkspace.id}`, 
                                currentAccount: account,
                                currentWorkspace: mainWorkspace
                            }}
                            onClick={ () => fetchWorkspace(mainWorkspace.id )} >
                            <FontAwesomeIcon icon="fa-solid fa-table-cells-large" size='2x' />
                        </Link>
                    </div>
    
                    <div className='side-nav-btn-wrapper'>
                        <a href="https://github.com/YWBK/humpday" target="_blank" className='side-nav-btn'>
                        {/* <a href="https://github.com/YWBK/humpday" target="_blank" className='side-nav-btn'> */}
                            <FontAwesomeIcon icon="fa-brands fa-github-alt" size='2x' />
                        </a>
                        
                    </div>
    
                    <div className='side-nav-btn-wrapper'>
                        <a href="https://www.linkedin.com/in/bill-kim-88987a42/" target="_blank" className='side-nav-btn'>
                            <FontAwesomeIcon icon="fa-brands fa-linkedin-in" size='2x' />
                        </a>
                    </div>
    
                    <div className='side-nav-btn-wrapper'>
                        <a href="https://angel.co/u/yong-woo-kim-1" target="_blank" className='side-nav-btn'>
                            <FontAwesomeIcon icon="fa-brands fa-angellist" size='2x' />
                        </a>
                    </div>
    
                    <div onClick={this.toggleClass} className='side-nav-btn-wrapper'>
                        <div className='side-nav-btn'>
                            {this.userInitials(this.props.currentUser.fullName)}
                            <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.active ? 'up' : 'down'}`} />
                        </div>
                    </div>
                    
                    <div className={ this.state.active ? 'side-nav-user-options' : 'side-nav-user-options hidden' } >
                        <div className='side-nav-user-options-user-show'>
                            <Link to={`/${account.account_name}/users/${this.props.currentUser.id}`}>
                                My profile
                            </Link>
                        </div>
                        <div className='side-nav-user-options-users-index'>
                            <Link to ={`/${account.account_name}/users`}>
                                Team
                            </Link>
                        </div>
                        <button onClick={() => this.props.logout()}>
                            Log out
                        </button>
                    </div>
                </div>
            )
        } else {
            return null;
            // return (<div></div>)
        }
    }
}