import React from 'react'
import { Route } from 'react-router-dom';
import SplashContainer from './splash/splash_container';
import SignupFormContainer from './session/signup_form_container';
import InvitationFormContainer from './session/invitation_form_container';
import LoginForm1Container from './session/login_form_1_container';
import LoginForm2Container from './session/login_form_2_container';
import LoginForm3Container from './session/login_form_3_container';
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
        <Route exact path='/auth/login_humpday/' component={LoginForm1Container} />
        <Route path='/auth/login_humpday/enter_slug' component={LoginForm2Container} />
        <Route path='/test2/auth/login_humpday/email_password' component={LoginForm3Container} />
    </div>
    )
}

export default App;