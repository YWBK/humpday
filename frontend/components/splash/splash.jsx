import React from 'react';
import  { Link, } from 'react-router-dom';

const Splash = ({ login, history }) => {
    const demoUser = {email: 'user@demo.com', password: 'Demo123'};
    const demoAcct = {account_name: 'demo'};
    const handleClick = e => {
        e.preventDefault();
        return history.push({pathname: '/users/signup'});
    }
    const getStarted = (
        <button className='get-started-btn' onClick={handleClick}>Get Started</button>
    )
    return (
        <div>
            <div className='nav-bar'>
                <div className='left-nav'>
                    <h2><Link to='/'>humpday.com</Link></h2> 
                </div>
                <div className='right-nav'>
                    <span id='demoLoginLink' onClick={()=> login(demoUser, demoAcct)}>Demo User</span>
                    <Link to='/auth/login_humpday'>Log in</Link>
                    <div className='get-started-btn-wrapper'>{getStarted}</div>
                </div>
            </div>
            <section className='splash'>
                <h1>A platform built for a new way of working</h1>
                <br/>
                <h3>What would you like to manage with humpday.com Work OS?</h3>
                <br/>
                <div className='get-started-btn-wrapper'>{getStarted}</div>
                <br/>
                <p>Free forever. No credit card.</p>
            </section>
        </div>
    )
}
export default Splash;