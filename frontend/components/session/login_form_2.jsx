import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: props.location.email, accountName: ''}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/test2/auth/login_humpday/email_password', 
            accountName: this.state.accountName 
        })
    }
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }
    render() {
        const { errors } = this.props;
        const loginForm = 
            <div>
                <h3><span>Log</span> In</h3>
                <p>Enter your account's web address</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input 
                            type='text' 
                            value={this.state.accountName} 
                            onChange={this.update('accountName')}
                            placeholder='e.g. my-team' 
                        />
                        <span>.humpday.com</span>
                    </label>
                    <br/>               
                    <button type='submit'>Next</button>
                </form>
                
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