import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import internal from 'stream'
import profilePlaceholder from '../assets/images/profilePlaceholder.webp'
import authApi from '../services/authApi'
import { APIError } from '../services/common'

import { useAuth } from './AuthProvider'


type Props = {}

const SignupPage = (props: Props) => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const auth = useAuth()

    function onSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({ email, firstName, lastName, password, confirmPassword })

        if (password !== confirmPassword) {
            let inputEl = document.querySelector('#password') as HTMLInputElement;
            inputEl.setCustomValidity("Passwords don't match")
            inputEl.reportValidity();
            console.log('passwords don\'t match');
            // event.stopPropagation();
            return;
        }

        async function performSignup() {
            // TODO: pass image
            try {
                await authApi.signup([firstName, lastName].join(' '), password, email, null)
                await auth.login(email, password);
                navigate('/dashboard')
            } catch (error) {
                if (error instanceof APIError) {
                    const errors: string[] = (error as APIError).errors
                    console.log(errors)
                    window.alert(errors.join('\n'))
                } else {
                    console.error(error)
                    window.alert('signup failed.')
                }
            }
        }

        performSignup();
    }

    return (
        <div className="container">
            <section id="signup-title">
                <h4>What is your <em>name ?</em></h4>
                <p className="text-body text-center">
                    Your name will appear on quotes and your public profile.
                </p>
                <button className='btn-circle centered btn-img'>
                    <a hidden href="https://www.vectorstock.com/royalty-free-vector/female-user-account-profile-circle-flat-icon-vector-33677758">Vector image by VectorStock / vectorstock</a>
                    <img src={profilePlaceholder} alt="profile placeholder" />
                </button>
            </section>

            <section id="signup-form">
                <form onSubmit={onSignup}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input placeholder='example@net.com' type="email" className="form-control"
                            id="email" aria-describedby="emailHelp"
                            required
                            onChange={e => setEmail(e.currentTarget.value)}
                            value={email} />
                    </div>
                    <div className="mb-3 row">
                        <div className="col-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input placeholder='John' type="text" className="form-control"
                                id="firstName" aria-describedby="firstName"
                                required
                                onChange={e => setFirstName(e.currentTarget.value)}
                                value={firstName} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input placeholder='Scott' type="text" className="form-control"
                                id="lastName" aria-describedby="lastName"
                                required
                                onChange={e => setLastName(e.currentTarget.value)}
                                value={lastName} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                            required
                            onChange={e => {
                                setPassword(e.currentTarget.value);
                                (e.currentTarget as HTMLInputElement).setCustomValidity('') // clear password invalidity
                            }}
                            value={password} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword"
                            required
                            onChange={e => {
                                setConfirmPassword(e.currentTarget.value);
                                (e.currentTarget as HTMLInputElement).setCustomValidity('') // clear password invalidity
                            }}
                            value={confirmPassword} />
                    </div>
                    <button type="submit" className="btn btn-positive btn-block">Sign up</button>

                    <div className="form-alt-action">
                        <span className='text-body'>Already have an account ?</span>
                        <a className='link-positive'>Sign in</a>
                    </div>
                </form>
            </section>

            <div className="white-space"></div>
        </div>
    )
}

export default SignupPage