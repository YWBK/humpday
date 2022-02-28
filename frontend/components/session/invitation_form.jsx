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
            <div className='signup-modal-bg'>
                <div className='signup-modal'>
                    <div className='signup-2-modal-content'>
                        <h3>Set up your account</h3>
                        <p>Fill in your profile details</p>
                        <form className='signup-form-2' onSubmit={this.handleSubmit}>           
                            <label id='signup-name'>Full Name
                                <input 
                                    type='text'
                                    value={this.state.fullName}
                                    onChange={this.update('fullName')}
                                />
                            </label>
                            <label id='signup-password'>Password
                                <input 
                                    type='password' 
                                    value={this.state.password} 
                                    onChange={this.update('password')}  
                                />
                            </label>
                            <label id='signup-account'>Account Name
                                <input 
                                    type='text' 
                                    value={this.state.accountName} 
                                    onChange={this.update('accountName')}  
                                />
                            </label>
                            <button type='submit'>Continue</button>
                        </form>
                        <div className='signup-flair'>
                            <p>Fill in your details so you can log in later</p>
                        </div>
                        <ul>
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


        return invitationForm;
    }
}