import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!this.state.registerEmail || !this.state.registerPassword || !this.state.registerName) {
            toast.error("Please enter valid information in all the input fields.", {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        } else if (!emailValid.test(this.state.registerEmail)) {
            toast.error("Please enter a valid email address.", {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        } else if (this.state.registerPassword.length < 6) {
            toast.error("Password must be at least 6 characters long.", {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        fetch('https://face-recognition-api-eg88.onrender.com/register', 
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
        .then(response => {
            return response.json();
        })
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-100-m w-50-l mw6 shadow-5 center blur">
                <main className="pa4 white-80 tc">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-white-10 white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                            />
                        </div>
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
                                value="Register" 
                            />
                        </div>
                    </div>
                </main>
                <ToastContainer autoClose={2000}/>
            </article>
        )
    }
}

export default Register;