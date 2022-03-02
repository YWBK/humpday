import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';

export default class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null }
    }
    componentDidMount() {
        // debugger
        // this.props.fetchAccount(this.props.account.id);
        this.props.fetchUser(this.props.match.params.userId);
        // this.setState({ [user]: this.props.user });
        debugger
    }

    render() {
        debugger
        return(
            <div className='user-show'>
                <SideNavContainer />
                {/* <div className='user-name'>{ this.state.user.fullName }</div> */}
                {/* <div className='user-email'>{ this.state.user.email }</div> */}
            </div>
        ) 
    }
}