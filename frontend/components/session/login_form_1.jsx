import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', error: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // debugger
        if (this.isValidEmail(this.state.email)) {
            // this.props.history.push({pathname: '/auth/login_humpday/enter_slug', email: this.state.email })

            this.props.fetchUserByEmail(this.state.email)
                .then(
                    () => this.props.history.push({pathname: '/auth/login_humpday/enter_slug', email: this.state.email }),
                    error => {this.setState({ error: error.responseJSON })}
                )
        } else {
            this.setState({ error: 'Unknown error, please try again' });
        }
    }
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value, error: '' });
    }
    isValidEmail(email) {
        return(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );
    }
    render() {
        const { errors, login } = this.props;
        const loginForm = 
            <div>
                <div className='nav-bar'>
                    <h2><Link className='nav-link' style={{ textDecoration: 'none' }} to='/'><span>humpday</span></Link></h2>
                </div>
                <div className='login-form-container'>
                    {!!this.state.error ? 
                        <p className='login-email-error'>{this.state.error}</p> :
                        <p className='login-email-error-none'><br/></p>
                    }
                    <h3>Log in to your account</h3>
                    <form onSubmit={this.handleSubmit}>
                        <p>Enter your work email address</p>
                        <label>
                            <input 
                                type='text' 
                                value={this.state.email} 
                                onChange={this.update('email')}
                                placeholder='Example@company.com' 
                                required
                            />
                        </label>
                        <br/>               
                        <button className='login-next' type='submit'>Next</button>
                    </form>
                    <br/>
                    <div className='login-with-demo'>
                        <p>Or Sign in with</p>
                        <br/>
                        <button 
                            className='login-demo-btn' 
                            onClick={()=> login(
                                // {email: 'user@demo.com', password: 'Demo123'}, 
                                // {account_name: 'demo'}
                                {email: 'rnadal@goat.com', password: 'Demo123'}, 
                                {account_name: 'goat'}
                            )} 
                        >
                            Demo User
                        </button>
                        <br/>
                    </div>
                    <div className='login-to-signup'>
                        <p>Don't have an account yet?</p>
                        <Link 
                            className='login-to-signup-link' 
                            style={{ textDecoration: 'none' }} 
                            to='/users/signup'>
                                Sign up
                        </Link>
                    </div>
                </div>
                
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>
        // );

        return loginForm;
    }
}