import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', fullName: '', password: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }
    render() {
        const { errors, currentUser } = this.props;
        const sessionForm = 
        // currentUser ? (
        //     <Redirect to='/'></Redirect>
        // ) : ( 
            <div>
                <h3>Log In</h3>
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
                    <button type='submit'>Submit</button>
                </form>
                
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>
        // );

        return sessionForm;
    }
}