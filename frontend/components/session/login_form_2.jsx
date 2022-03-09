import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: props.location.email, accountName: '', error: ''}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.fetchAccountByName(this.state.accountName)
            .then(
                response => {
                    this.props.history.push({
                        pathname: `/${this.state.accountName}/auth/login_humpday/email_password`,
                        accountName: this.state.accountName  
                    })
                },
                error => {this.setState({ error: error.responseJSON })}
            )
    }
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value, error: '' });
    }
    render() {
        const { errors } = this.props;
        const loginForm = 
            <div className='login-2-wrapper'>
                <div className='nav-bar'>
                    <h2><Link className='nav-link' style={{ textDecoration: 'none' }} to='/'><span>humpday</span></Link></h2>
                </div>
                <div className='login-form-2-wrapper'>
                    {!!this.state.error ? 
                        <p className='login-email-error'>{this.state.error}</p> :
                        <p className='login-email-error-none'><br/></p>
                    }
                    <h3><span className='log'>Log</span> In</h3>
                    <p>Enter your account's web address</p>
                    <form className='login-form-2'onSubmit={this.handleSubmit}>
                        <label className='login-account-address'>
                            <input 
                                type='text' 
                                value={this.state.accountName} 
                                onChange={this.update('accountName')}
                                placeholder='e.g. my-team' 
                                required
                            />
                            <span className='login-host-name'>.humpday.com</span>
                        </label>
                        <button className='login-next' type='submit'>Next</button>
                    </form>
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