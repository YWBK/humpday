import React from 'react'
import { Route } from 'react-router-dom';
import SplashContainer from './splash/splash_container';
import SignupFormContainer from './session/signup_form_container';
import InvitationFormContainer from './session/invitation_form_container';
import AccountLoginFormContainer from './session/account_login_form_container';
import LoginFormContainer from './session/login_form_container';
// import { AuthRoute } from '../util/route_util';

const App = () => {
    // const accountName = this.props.match.
    return (
    <div>
        <header>
            <h1>humpday.com</h1>
            <SplashContainer />
        </header>

        {/* <Route path={`/${accountName}/`} component={LoginFormContainer} /> */}
        <Route path='/users/signup' component={SignupFormContainer} />
        <Route path='/users/invitation' component={InvitationFormContainer} />
        <Route path='/auth/auth/login_humpday/enter_slug' component={AccountLoginFormContainer} />
        <Rout path='/ywbk/auth/login_humpday/email_password' component={LoginFormContainer} />
    </div>
    )
}

export default App;