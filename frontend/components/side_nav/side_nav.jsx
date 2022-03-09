import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { fetchWorkspace } from '../../util/workspace_api_util';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.sideNav = React.createRef();
        this.state = { active: false }
        this.toggleClass = this.toggleClass.bind(this);
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClick);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    handleOuterClick(e) {
        if (
            this.sideNav.current &&
            !this.sideNav.current.contains(e.target)
        ) {
            this.setState({
                active: false,
            })
        }
    }

    userInitials = string => {
        const words = string.split(' ')
        if (words.length < 2) {
            const firstLetter = words[0][0];
            return (
                <div className='userInitials'>
                    <FontAwesomeIcon icon={`fa-solid fa-${firstLetter}`} size='1x' />
                </div>
            ) 
        } else {
            // return (words[0][0] + words[1][0]).toUpperCase();
            const firstLetter = words[0][0];
            const secondLetter = words[1][0];
            return (
                <div className='userInitials'>
                    <FontAwesomeIcon icon={`fa-solid fa-${firstLetter}`} size='1x' />
                    <FontAwesomeIcon icon={`fa-solid fa-${secondLetter}`} size='1x' />
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
            // debugger
            return (
                <div className='side-nav' >
                    <div className='side-nav-top'>
                        <div className={
                            (this.props.match.params.workspaceId || 
                            this.props.match.params.boardId) ?
                            'side-nav-btn-wrapper' : 
                            'side-nav-btn-wrapper active-route' 
                        }>
                            <Link to='/' className='side-nav-btn'>
                                <FontAwesomeIcon icon="fa-solid fa-house" size='2x' />
                            </Link>
                        </div>
        
                        <div className={
                            (this.props.match.params.workspaceId || 
                            this.props.match.params.boardId) ?
                            'side-nav-btn-wrapper active-route' : 
                            'side-nav-btn-wrapper' 
                        }>                            
                            <Link 
                                className='side-nav-btn'
                                to={{
                                    pathname:`/${account.accountName}/workspaces/${mainWorkspace.id}`, 
                                    currentAccount: account,
                                    currentWorkspace: mainWorkspace
                                }}
                                onClick={ () => fetchWorkspace(mainWorkspace.id )} >
                                <FontAwesomeIcon icon="fa-solid fa-table-cells-large" size='2x' />
                            </Link>
                        </div>
                    </div>
                    <div className='side-nav-mid'>
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
                    </div>
                    <div className='side-nav-bot'>
                        <div className={ this.state.active ? 'side-nav-user-options' : 'side-nav-user-options hidden' } ref={this.sideNav}>
                            <div className='side-nav-user-account'>{account.accountName}</div>
                            <div className='side-nav-user-option-wrapper' >
                                <Link className='side-nav-user-option' to={`/${account.accountName}/users/${this.props.currentUser.id}`}>
                                    <FontAwesomeIcon icon="fa-solid fa-user" />
                                    My profile
                                </Link>
                            </div>
                            <div className='side-nav-user-option-wrapper'>
                                <Link className='side-nav-user-option' to ={`/${account.accountName}/users`}>
                                    <FontAwesomeIcon icon="fa-solid fa-user-group" />
                                    Team
                                </Link>
                            </div>
                            <div className='side-nav-user-option-wrapper' onClick={() => this.props.logout()}>
                                <span className='side-nav-user-option' >
                                    <FontAwesomeIcon icon="fa-solid fa-door-open" />
                                    Log out
                                </span>
                            </div>
                        </div>
                        <div onClick={this.toggleClass} className='side-nav-user-btn-wrapper'>
                            <div className='side-nav-user-btn'>
                                {/* <FontAwesomeIcon icon={`fa-solid fa-chevron-${this.state.active ? 'down' : 'up'}`} /> */}
                                {this.userInitials(this.props.currentUser.fullName)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
            // return (<div></div>)
        }
    }
}

export default withRouter(SideNav);