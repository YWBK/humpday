import React from 'react';
import SideNavContainer from '../side_nav/side_nav_container';
import WorkspaceListItem from '../workspaces/workspace_list_item';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({hour: null})
        this.currentHour = this.currentHour.bind(this);
    }

    componentDidMount() {
        this.props.fetchWorkspaces();
        this.currentHour();
    }

    currentHour() {
        const hour = new Date().getHours();
        this.setState({hour: hour});
    }

    render() {
        const { currentUser, workspaces, fetchWorkspace } = this.props
        let greeting
        if (this.state.hour < 12) {
            greeting = 'morning';
        } else if (this.state.hour < 6 ) {
            greeting = 'afternoon';
        } else {
            greeting = 'evening';
        }
        if (Object.keys(workspaces).length < 1) return null;
        return(
            <div>
                <SideNavContainer className='side-nav' />
                <div className='welcome-bar'>
                    Good {greeting}, {currentUser.fullName.split(' ')[0]}!
                </div>

                <div className='main-content' id='home-page-bg'>
                    <div id='home-page-content'>
                        <span>My workspaces</span>
                        <ul>
                            { workspaces.map((workspace) => {
                                return (
                                <WorkspaceListItem 
                                    key={workspace.id} 
                                    workspace={workspace}
                                    currentAccount={currentUser.account}
                                    fetchWorkspace={fetchWorkspace}
                                />
                            )})}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}