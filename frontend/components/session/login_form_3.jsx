import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            accountName: props.match.params.accountName
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // debugger
    }

    componentDidMount() {
        if (this.props.match.params.accountName !== '') {
            this.props.fetchAccountByName(this.props.match.params.accountName)
        }
        this.props.location.accountName = this.state.accountName;
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
                <div className='nav-bar'>
                    <h2><Link className='nav-link' style={{ textDecoration: 'none' }} to='/'><span>humpday</span></Link></h2>
                </div>
                <div className='login-form-container'>
                    <h3><span className='log'>Log</span> In</h3>
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
                </div>
                
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