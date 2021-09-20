import React from 'react';

type AuthState = {
    signup: boolean,
    email: string,
    password: string,
    firstName: string,
    phoneNumber: string,
    isAdmin: boolean,
    errorText: string,
    emailValid: boolean,
    pwValid: boolean,
    token: string
}

export class Auth extends React.Component<{}, AuthState> {

        state = {
            signup: true,
            email: '',
            password: '',
            firstName: '',
            phoneNumber: '',
            isAdmin: false,
            errorText: '',
            emailValid: false,
            pwValid: false,
            token: ''
        }


    handleSignup = async () => {
        const apiURL = 'http://localhost:3000/member/register';
        const reqBody = {
            Member: {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                phoneNumber: this.state.phoneNumber,
                isAdmin: this.state.isAdmin,
            }
        }

        try {
            const res = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const json = await res.json();
            const token = json.sessionToken
            localStorage.setItem('SessionToken', token)

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    handleLogin = async () => {
        const apiURL = 'http://localhost:3000/member/login';
        console.log(apiURL)
        const reqBody = {
            Member:{
                email: this.state.email,
                password: this.state.password,
            }
        }
        console.log(reqBody)

        try {
            console.log(reqBody)
            const res = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const json = await res.json();
            console.log(json)
            const token = json.sessionToken
            localStorage.setItem('SessionToken', token)

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const emailInput = document.getElementById('email');
        this.setState({
            email: e.target.value,
            // emailValid: emailInput.checkValidity()
        })
    }

    handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const pwInput = document.getElementById('password');
        this.setState({
            password: e.target.value,
            // pwValid: pwInput.checkValidity()
        })
    }

    render() {
        return(
            <>
                {this.state.signup ?
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleSignup()
                }}>
                    <div>
                        <div>
                            <label htmlFor='email'>Email: </label>
                            <input type='email' id='email' name='email' title='Please enter a valid email address.' required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' onChange={(e) => { this.handleEmail(e) }} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='password'>Password: </label>
                            <input type='password' id='password' name='password' title='Password must be between 8 and 16 characters, and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.' required pattern='^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^+=]).*$' onChange={(e) => { this.handlePassword(e) }} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='firstName'>First Name: </label>
                            <input type='text' id='firstName' name='firstName' required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({firstName: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='phoneNumber'>Phone Number: </label>
                            <input type='text' id='phoneNumber' name='phoneNumber' placeholder='(optional)' onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({phoneNumber: e.target.value})} />
                        </div>
                    </div>
                    <button type="button" onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</button>
                    <button type='submit'>{this.state.signup ? 'Signup' : 'Login'}</button>
                </form> :
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleLogin()
                }}>
                    <div>
                        <div>
                            <label htmlFor='email'>Email: </label>
                            <input type='email' id='email' name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({email: e.target.value}) }} title='Please enter the email address used to signup.' required />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='password'>Password: </label>
                            <input type='password' id='password' name='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({password: e.target.value}) }} title='Please enter your password.' required />
                        </div>
                    </div>
                    <button type="button" onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</button>
                    <button type='submit'>{this.state.signup ? 'Signup' : 'Login'}</button>
                </form>
                }
            </>
        )
    }
}