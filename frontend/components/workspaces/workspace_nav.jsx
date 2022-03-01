import React from 'react';

export default class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, workspaceName: '' };
        this.toggleClass = this.toggleClass.bind(this);
    }
    componentDidMount() {
        this.props.fetchWorkspaces();
    }
    toggleClass() {
        this.setState({ active: !this.state.active })
    }


    render() {
        const { currentWorkspace, workspaceMembers, account } = this.props;
        return (
            <div>
                Workspace
                <div className='workspace-nav-dropdown'>
                    Main Workspace
                </div>
                <button onClick={this.toggleClass} >{ this.state.active ? '<' : '> ' }</button>
            </div>
        )
    }
}