import React from 'react'
import { Switch, Link, Route } from 'react-router-dom';
import SplashContainer from './splash/splash_container';
import SignupFormContainer from './session/signup_form_container';
import InvitationFormContainer from './session/invitation_form_container';
import LoginForm1Container from './session/login_form_1_container';
import LoginForm2Container from './session/login_form_2_container';
import LoginForm3Container from './session/login_form_3_container';
import HomePageContainer from './home_page/home_page_container';
// import { AuthRoute } from '../util/route_util';

const App = () => {
    // const accountName = this.props.match.
    return (
    <div>
        <div className='navBar'>
            <h2><Link to='/'>humpday.com</Link></h2>
            <SplashContainer />
            <Switch>
                <Route path='/users/signup' component={SignupFormContainer} />
                <Route path='/users/invitation' component={InvitationFormContainer} />
                <Route path='/auth/login_humpday/enter_slug' component={LoginForm2Container} />
                <Route path='/auth/login_humpday/' component={LoginForm1Container} />
                <Route path='/:accountName/auth/login_humpday/email_password' component={LoginForm3Container} />
                <Route path='/:accountName' component={HomePageContainer} />
            </Switch>
        </div>
    </div>
    )
}

export default App;