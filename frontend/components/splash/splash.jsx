import React from 'react';
import  { Link, } from 'react-router-dom';

const Splash = ({ login }) => {
    const demoUser = {email: 'user@demo.com', password: 'Demo123'};
    const demoAcct = {account_name: 'demo'};

    return (
        <div className='nav-bar'>
            <div className='left-nav'>
                <h2><Link to='/'>humpday.com</Link></h2> 
            </div>
            <div className='right-nav'>
                <Link to='/auth/login_humpday'>Log in</Link>
                <Link to='/users/signup'>Get Started</Link>
                <span id='demoLoginLink' onClick={()=> login(demoUser, demoAcct)}>Demo User</span>
            </div>
        </div>
    )
}
export default Splash;