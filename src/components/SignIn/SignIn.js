import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            loginAttempts: 0, // Initialize login attempts counter
            maxLoginAttempts: 3, // Set the maximum allowed login attempts
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    handleSignInError() {
        if (this.state.loginAttempts >= this.state.maxLoginAttempts) {
            toast.error("Maximum login attempts reached. Please try again later.", {
                position: toast.POSITION.TOP_CENTER
            });
            setTimeout(() => {
                this.setState({ loginAttempts: 0 });
            }, 10000);
        } else {
            toast.error("Please enter a valid username and password.", {
                position: toast.POSITION.TOP_CENTER,
            });
            this.setState((prevState) => ({ loginAttempts: prevState.loginAttempts + 1 }));
        }
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        if (!this.state.signInEmail || !this.state.signInPassword) {
            this.handleSignInError()
            return;
        }
        fetch('http://localhost:3000/signin', 
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            } else {
                this.handleSignInError();
            }
        })
        .catch(err => {
            console.log('Error'+ err);
            this.handleSignInError();
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-100-m w-50-l mw6 shadow-5 center blur">
                <main className="pa4 white-80 tc">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input  
                                className="pa2 input-reset ba bg-transparent hover-bg-white-10 white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-white-10 white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange} 
                            />
                        </div>
                        </fieldset>
                        <div>
                            <input 
                                onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba white-90 b--white-60 bg-transparent dim pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                                onClick={() => onRouteChange('register')} 
                                className="f6 ba b--white-40 pointer link dim white-90 db">
                                Register
                            </p>
                        </div>
                    </div>
                </main>
                <ToastContainer autoClose={2000}/>
            </article>
        );
    }
}

export default SignIn;