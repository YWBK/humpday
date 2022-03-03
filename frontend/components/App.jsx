import React from 'react'
import { Switch, Link, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash/splash_container';
import SignupFormContainer from './session/signup_form_container';
import InvitationFormContainer from './session/invitation_form_container';
import LoginForm1Container from './session/login_form_1_container';
import LoginForm2Container from './session/login_form_2_container';
import LoginForm3Container from './session/login_form_3_container';
import HomePageContainer from './home_page/home_page_container';
import UserShowContainer from './users/user_show_container';
import UsersIndexContainer from './users/users_index_container';
import WorkspaceShowContainer from './workspaces/workspace_show_container';
import Modal from './modal/modal';
import SideNavContainer from './side_nav/side_nav_container';
const App = () => {


    return (
    <div>
        <Modal />
        <SideNavContainer />
        <Switch>
            <AuthRoute path='/users/signup' component={SignupFormContainer} />
            <AuthRoute path='/users/invitation' component={InvitationFormContainer} />
            <ProtectedRoute path='/:accountName/users/:userId' component={UserShowContainer} />
            <ProtectedRoute path='/:accountName/users' component={UsersIndexContainer} />
            <AuthRoute path='/auth/login_humpday/enter_slug' component={LoginForm2Container} />
            <AuthRoute path='/auth/login_humpday/' component={LoginForm1Container} />
            <AuthRoute path='/:accountName/auth/login_humpday/email_password' component={LoginForm3Container} />
            <ProtectedRoute path='/:accountName/workspaces/:workspaceId' component={WorkspaceShowContainer} />
            <ProtectedRoute path='/:accountName' component={HomePageContainer} />
            <AuthRoute exact path='/' component={SplashContainer} />
        </Switch>
    </div>
    )
}




export default App;