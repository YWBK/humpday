import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: ''}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.findUserByEmail({email: this.state.email})
        this.props.history.push({pathname: '/auth/login_humpday/enter_slug', email: this.state.email })
    }
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }
    render() {
        const { errors } = this.props;
        const loginForm = 
            <div>
                <h3>Log in to your account</h3>
                <p>Enter your work email address</p>
                <form onSubmit={this.handleSubmit}>
                    <label>Email
                        <input 
                            type='email' 
                            value={this.state.email} 
                            onChange={this.update('email')}
                            placeholder='Example@company.com' 
                            required
                        />
                    </label>
                    <br/>               
                    <button type='submit'>Submit</button>
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