import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 


export default class UserShow extends React.Component {
    constructor(props) {
        super(props);
        // props.fetchUser(props.match.params.userId);
        this.state = { user: null }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
            .then(() => this.props.fetchWorkspaces());
    }

    userInitials = string => {
        const words = string.split(' ')
        if (words.length < 2) {
            const firstLetter = words[0][0];
            return (
                <div className='userInitials'>
                    <FontAwesomeIcon icon={`fa-solid fa-${firstLetter}`} size='3x' />
                </div>
            ) 
        } else {
            const firstInitial = words[0][0].toLowerCase();
            const secondLetter = words[1][0].toLowerCase();
            return (
                <div className='userInitials'>
                    <FontAwesomeIcon icon={`fa-solid fa-${firstInitial}`} size='3x' />
                    <FontAwesomeIcon icon={`fa-solid fa-${secondLetter}`} size='3x' />
                </div>
            )
        }
    }

    render() {
        // debugger
        return(
            <div>
                <SideNavContainer className='side-nav' />
                <div className='main-content' id='users-page'>
                    { this.props.user ?
                        <div className='user-info'>
                            <div className='user-banner'>
                                <div className='user-initials'>
                                    {this.userInitials(this.props.user.fullName)}
                                </div>
                                <div className='user-name'>
                                    { this.props.user.fullName }
                                </div>
                            </div>
                            <div className='user-email'>
                                <FontAwesomeIcon icon="fa-regular fa-envelope" />
                                <span>Email:</span> 
                                <span>{ this.props.user.email }</span>
                            </div>
                        </div> : ''
                    }
                </div>
            </div>
        ) 
    }
}