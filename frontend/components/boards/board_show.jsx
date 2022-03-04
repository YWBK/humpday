import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceNavContainer from '../workspace_nav/workspace_nav_container';
export default class BoardShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, boardName: '' };
        // this.toggleClass = this.toggleClass.bind(this);
    }
    render() {
        return(
            <div className=''>
                <SideNavContainer className='side-nav' />
                <div className='main-content'>
                    {/* <WorkspaceNav /> */}
                    Board Show Page
                </div>
            </div>
        )
    }
}