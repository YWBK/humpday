import React from 'react';
import  { Link, } from 'react-router-dom';
import SplashListItem from './splash_list_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Splash = ({ login, history }) => {
    const demoUser = {email: 'user@demo.com', password: 'Demo123'};
    const demoAcct = {account_name: 'demo'};

    const handleClick = e => {
        e.preventDefault();
        return history.push({pathname: '/users/signup'});
    }
    const getStarted = (
        <button className='get-started-btn-1' onClick={handleClick}>
            Get Started
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" className='signup-arrow' />
        </button>
    )
    const getStarted2 = (
        <button className='get-started-btn-2' onClick={handleClick}>
            Get Started
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" className='signup-arrow' />
        </button>
    )

    const splashListItems = [
        'Creative & design',
        'IT',
        'Software development',
        'Marketing',
        'Project Management',
        'Sales & CRM',
        'Task Management',
        'HR',
        'Operations'
    ];

    return (
        <div className='main-content' id='splash-main'>
            <div className='nav-bar'>
                <div className='left-nav'>
                    <h2><Link className='nav-link' style={{ textDecoration: 'none' }} to='/'><span>humpday</span>.com</Link></h2> 
                </div>
                <div className='right-nav'>
                    <span className='nav-link' id='demo-login-link' onClick={()=> login(demoUser, demoAcct)}>Demo User</span>
                    <Link className='nav-link' style={{ textDecoration: 'none' }} to='/auth/login_humpday'>Log in</Link>
                    <div className='get-started-btn-wrapper'>{getStarted}</div>
                </div>
            </div>
            <div className='splash-content'>
                <h1>A platform built for a new way of working</h1>
                <br/>
                <h3>What would you like to manage with humpday.com Work OS?</h3>
                <br/>
                <div>
                    <ul className='work-list'>
                        {splashListItems.map((item, idx) => (
                            <SplashListItem item={item} id={idx + 1} key={idx} />
                        ))}
                    </ul>
                </div>
                <br/>
                <div className='get-started-btn-wrapper'>{getStarted2}</div>
                <br/>
                <p>Free forever. No credit card.</p>
            </div>
        </div>
    )
}
export default Splash;