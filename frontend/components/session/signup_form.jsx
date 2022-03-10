import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', error: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isValidEmail(this.state.email)) {
            this.props.fetchUserByEmail(this.state.email)
            .then(
                () => {this.setState({ error: 'Email already in use' })},
                () => this.props.history.push({pathname: '/users/invitation', email: this.state.email })
                )
                // this.props.history.push({pathname: '/users/invitation', email: this.state.email })
        } else {
            this.setState({ error: 'Please enter a valid email address' });
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
        const { login } = this.props;
        const signupForm = 
            <div className='signup-modal-bg'>
                <div className='signup-modal'>
                    <div className='signup-1-modal-content'>
                        <h3>Welcome to humpday.com</h3>
                        <p className='caption'>Let's get started with a few simple steps</p>
                        <form className='signup-form-1' onSubmit={this.handleSubmit}>
                            <label>Enter email
                                <br/>
                                <input 
                                    type='text' 
                                    placeholder='name@company.com'
                                    value={this.state.email} 
                                    onChange={this.update('email')} 
                                />
                            </label>
                            {!!this.state.error ? 
                                <p className='email-error'>{this.state.error}</p> :
                                <p><br/></p>
                            }
                            <br/>               
                            <button type='submit'>Continue</button>
                        </form>
                        <div className='signup-with-demo'>
                            <p>OR</p>
                            <br/>
                            <button 
                                className='signup-demo-btn' 
                                onClick={
                                    ()=> login(
                                    // {email: 'user@demo.com', password: 'Demo123'}, 
                                    // {account_name: 'demo'}
                                    {email: 'rnadal@goat.com', password: 'Demo123'}, 
                                    {account_name: 'goat'}
                                )} 
                            >
                                Continue with a Demo User
                            </button>
                            <br/>
                        </div>
                        <div className='login-instead'>
                            Already have an account? 
                            <Link 
                                to='/auth/login_humpday'
                                className='signup-to-login-link' 
                                style={{ textDecoration: 'none' }} >
                                    Log In
                            </Link>
                        </div>
                        <div className='signup-flair'>
                            <p>Join dozens of teams that manage their work better</p>
                        </div>
                    </div>
                </div>
            </div>

        return signupForm;
    }
}