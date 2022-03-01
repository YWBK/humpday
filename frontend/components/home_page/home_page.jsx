import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';

export default class HomePage extends React.Component {

    // componentDidMount() {
    //     if (this.props.match.params.accountName !== '') {
    //         this.props.fetchAccountByName(this.props.match.params.accountName)
    //     }
    // }
    render() {
        return(
            <SideNavContainer />
            // <div>Home Page
            //     <div className='side-nav'>
            //         <button onClick={() => this.props.logout()}>Log Out</button>
            //     </div>
            // </div>

        )
    }
}