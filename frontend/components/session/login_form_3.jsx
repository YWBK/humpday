import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            accountName: props.location.accountName 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, {email: this.state.email, password: this.state.password});
        const accountName = Object.assign({}, {account_name: this.state.accountName});
        this.props.login(user, accountName);  
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    render() {
        const { errors } = this.props;
        const login1Form = 
            <div>
                <h3><span>Log</span> In</h3>
                <p>{this.state.accountName}</p>
                <form onSubmit={this.handleSubmit}>
                    <label>Email
                        <input 
                            type='text' 
                            value={this.state.email} 
                            onChange={this.update('email')} 
                        />
                    </label>
                    <br/>
                    <label>Password
                        <input 
                            type='password' 
                            value={this.state.password} 
                            onChange={this.update('password')} 
                        />
                    </label>
                    <br/>
                    <button type='submit'>Log In</button>
                </form>
                
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>
        // );

        return login1Form;
    }
}