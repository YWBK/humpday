import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class InvitationForm extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = { email: props.location.email, fullName: '', password: '', accountName: '' }
        // debugger
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, {email: this.state.email, full_name: this.state.fullName, password: this.state.password});
        const accountName = Object.assign({}, {account_name: this.state.accountName});
        // debugger
        this.props.signup(user, accountName);
    }
    update(field) {
        // debugger
        return e => this.setState({ [field]: e.currentTarget.value });
    }
    render() {
        const { errors } = this.props;
        const invitationForm = 
            <div>
                <h3>Set up your account</h3>
                <p>Fill in your profile details</p>
                <form onSubmit={this.handleSubmit}>           
                    <label>Full Name
                        <br/>   
                        <input 
                            type='text'
                            value={this.state.fullName}
                            onChange={this.update('fullName')}
                        />
                    </label>
                    <br/>
                    <label>Password
                        <br/>
                        <input 
                            type='password' 
                            value={this.state.password} 
                            onChange={this.update('password')}  
                        />
                    </label>
                    <br/>
                    <label>Account Name
                        <br/>
                        <input 
                            type='text' 
                            value={this.state.accountName} 
                            onChange={this.update('accountName')}  
                        />
                    </label>
                    <br/>
                    <button type='submit'>Continue</button>
                </form>
                
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>

        return invitationForm;
    }
}