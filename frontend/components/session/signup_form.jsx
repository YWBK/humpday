import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push({pathname: '/users/invitation', email: this.state.email })
    }
    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }
    render() {
        const { errors } = this.props;
        const signupForm = 
            <div>
                <h3>Welcome to humpday.com</h3>
                <p>Get started - it's free. No credit card needed.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter email
                        <br/>
                        <input 
                            type='text' 
                            value={this.state.email} 
                            onChange={this.update('email')} 
                        />
                    </label>
                    <br/>               
                    <button type='submit'>Continue</button>
                </form>
                <p>
                    Already have an account? <Link to='/auth/login_humpday'>Log In</Link>
                </p>
                
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>

        return signupForm;
    }
}