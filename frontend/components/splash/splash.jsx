import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

const Splash = ({currentUser, accountName, logout}) => {
    const display = currentUser ? (
        <Redirect to={`/${accountName}`}></Redirect>
        // <div>
        //     <h3>Welcome {currentUser.username}!</h3>
        //     <button onClick={() => logout()}>Log out</button>
        // </div>
    ) : ( <div>
        <Link to='/auth/login_humpday'>Log in</Link>
        <Link to='/users/signup'>Get Started</Link>
    </div>
    );

    return display;
}
export default Splash;