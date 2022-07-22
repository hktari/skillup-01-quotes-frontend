import React, { useState } from 'react'
import profilePlaceholder from '../assets/images/profilePlaceholder.webp'

type Props = {}

const SignupPage = (props: Props) => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input placeholder='example@net.com' type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 row">
                        <div className="col-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input placeholder='John' type="text" className="form-control" id="firstName" aria-describedby="firstName" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input placeholder='Scott' type="text" className="form-control" id="lastName" aria-describedby="lastName" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" />
                    </div>
                    <button type="submit" className="btn btn-positive btn-block">Sign up</button>

                    <div className="sign-in-container">
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