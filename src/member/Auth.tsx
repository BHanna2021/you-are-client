import React from 'react';
import {
    Container,
    Form,
    Button,
    ReverseButton,
    Input,
    AuthHeader,
    Label
} from '../styles/style';

type AuthProps = {
    updateToken(token: string): void,
    clickLogout(): void,
    updateAdmin(admin: string): void
}

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
    token: string,
    begErr: string
}

export default class Auth extends React.Component<AuthProps, AuthState> {

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
            token: '',
            begErr: 'Our apologies, '
        }


    handleSignup = async () => {
        const signErr = 'this email may already be in use, please try logging in or choose a different email.'
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
            const admin = "" + json.member.isAdmin
            this.props.updateToken(token);
            this.props.updateAdmin(admin)

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            }
        } catch (err) {
            alert(`${this.state.begErr}${signErr}`)
            console.log(err)
        }
    }

    handleLogin = async () => {
        const logErr = 'the username and/or password entered does not match our records.';
        const apiURL = 'http://localhost:3000/member/login';
        const reqBody = {
            Member:{
                email: this.state.email,
                password: this.state.password,
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
            const admin = "" + json.member.isAdmin
            this.props.updateToken(token);
            this.props.updateAdmin(admin);

            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            }
        } catch (err) {
            alert(`${this.state.begErr}${logErr}`)
            console.log(err)
        }
    }

    handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const emailInput = document.getElementById('email') as HTMLInputElement;
        if (emailInput != null) {
            this.setState({
                email: e.target.value,
                emailValid: emailInput.checkValidity()
            })
        }
    }

    handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const pwInput = document.getElementById('password') as HTMLInputElement;
        if (pwInput != null){
            this.setState({
                password: e.target.value,
                pwValid: pwInput.checkValidity()
            })
        }
    }

    render() {
        return(
            <>
            <AuthHeader>
                <h1>You Are...</h1>
                <br />
                <h3>A safe place to find and create uplifting quotes, and journal through life.</h3>
            </AuthHeader>
                {this.state.signup ?
                <Container>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleSignup()
                }}>
                    <div>
                        <div>
                            <Label htmlFor='email'>Email: </Label>
                            <br />
                            <Input type='email' id='email' name='email' title='Please enter a valid email address.' required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' onChange={(e) => { this.handleEmail(e) }} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <div>
                            <Label htmlFor='password'>Password: </Label>
                            <br />
                            <Input type='password' id='password' name='password' title='Password must be between 8 and 16 characters, and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.' required pattern='^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^+=]).*$' onChange={(e) => { this.handlePassword(e) }} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <div>
                            <Label htmlFor='firstName'>First Name: </Label>
                            <br />
                            <Input type='text' id='firstName' name='firstName' required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({firstName: e.target.value})} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <div>
                            <Label htmlFor='phoneNumber'>Phone Number: </Label>
                            <br />
                            <Input type='text' id='phoneNumber' name='phoneNumber' placeholder='(optional)' onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({phoneNumber: e.target.value})} />
                        </div>
                    </div>
                    <br />
                    <Button type="button" onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</Button>&nbsp;
                    <ReverseButton type='submit'>{this.state.signup ? 'Signup' : 'Login'}</ReverseButton>
                </Form>
                </Container> :
                <Container>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleLogin()
                }}>
                    <div>
                        <div>
                            <Label htmlFor='email'>Email: </Label>
                            <br />
                            <Input type='email' id='email' name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({email: e.target.value}) }} title='Please enter the email address used to signup.' required />
                        </div>
                    </div>
                    <br />
                    <div>
                        <div>
                            <Label htmlFor='password'>Password: </Label>
                            <br />
                            <Input type='password' id='password' name='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({password: e.target.value}) }} title='Please enter your password.' required />
                        </div>
                    </div>
                    <br />
                    <Button type="button" onClick={() => this.setState({signup: !this.state.signup})}>{this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</Button>&nbsp;
                    <ReverseButton type='submit'>{this.state.signup ? 'Signup' : 'Login'}</ReverseButton>
                </Form>
                </Container>
                }
            </>
        )
    }
}