import React from 'react';
import  { Link, Redirect } from 'react-router-dom';

export default class LoginForm3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            accountName: props.match.params.accountName,
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);

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
       if (this.isValidEmail(this.state.email)) {
           this.props.login(user, accountName)
            .then(null, error => {
                this.setState({ error: error.errors.responseJSON[0]})
            });  
       } else {
           this.setState({ error: 'Unknown error, please try again'});
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
        const login3Form = 
            <div>
                <div className='nav-bar'>
                    <h2><Link className='nav-link' style={{ textDecoration: 'none' }} to='/'><span>humpday</span></Link></h2>
                </div>
                <div className='login-form-3-container'>
                        {!!this.state.error ? 
                            <p className='login-email-error'>{this.state.error}</p> :
                            <p className='login-email-error-none'><br/></p>
                        }
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
                        <button className='login-next' type='submit'>Log In</button>
                    </form>
                    <br/>
                    <div className='login-3-with-demo'>
                        <p>Or Sign in with</p>
                        <br/>
                        <button 
                            className='login-3-demo-btn' 
                            onClick={()=> login(
                                {email: 'user@demo.com', password: 'Demo123'}, 
                                {account_name: 'demo'}
                            )} 
                        >
                            Demo User
                        </button>
                        <br/>
                    </div>
                    <div className='login-to-another-account'>
                        <p>
                            In order to sign up 
                            to <span style={{ fontWeight: '700', color: 'black' }}>{this.state.accountName}</span>'s account, 
                            you have to be invited by its admin
                        </p>
                        <Link 
                            className='login-to-signup-link' 
                            style={{ textDecoration: 'none' }} 
                            to='/auth/login_humpday'>
                                Login to another account
                        </Link>
                    </div>
                </div>
                
            </div>
        // );

        return login3Form;
    }
}