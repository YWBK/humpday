import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';

export default class UserShow extends React.Component {
    constructor(props) {
        super(props);
        // props.fetchUser(props.match.params.userId);
        this.state = { user: null }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);
    }

    render() {
        // debugger
        return(
            <div className='user-show'>
                <SideNavContainer />
                { this.props.user ?
                    <div className='user-info'>
                        <div className='user-name'>{ this.props.user.fullName }</div>
                        <div className='user-email'>{ this.props.user.email }</div>
                    </div> : ''
                }
            </div>
        ) 
    }
}