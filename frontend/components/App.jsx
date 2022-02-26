import React from 'react'
import { Switch, Link, Route } from 'react-router-dom';
import SplashContainer from './splash/splash_container';
import SignupFormContainer from './session/signup_form_container';
import InvitationFormContainer from './session/invitation_form_container';
import LoginForm1Container from './session/login_form_1_container';
import LoginForm2Container from './session/login_form_2_container';
import LoginForm3Container from './session/login_form_3_container';
import HomePageContainer from './home_page/home_page_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
    return (
    <div>
        <Switch>
            <AuthRoute path='/users/signup' component={SignupFormContainer} />
            <AuthRoute path='/users/invitation' component={InvitationFormContainer} />
            <AuthRoute path='/auth/login_humpday/enter_slug' component={LoginForm2Container} />
            <AuthRoute path='/auth/login_humpday/' component={LoginForm1Container} />
            <AuthRoute path='/:accountName/auth/login_humpday/email_password' component={LoginForm3Container} />
            <ProtectedRoute path='/:accountName' component={HomePageContainer} />
            <AuthRoute exact path='/' component={SplashContainer} />
        </Switch>
    </div>
    )
}

export default App;