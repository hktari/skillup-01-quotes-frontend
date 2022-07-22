import React, { useState } from 'react'

type Props = {}

const LoginPage = (props: Props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('login', event);
    }


    return (
        <div id='login-form' className="container">
            <h4>Welcome <em>back!</em></h4>
            <p className="body-text">
                Thank you for coming back. Hope you have a godo day and inspire others.
            </p>

            <form onSubmit={onLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input placeholder='example@net.com' type="email" className="form-control"
                        id="email" aria-describedby="emailHelp"
                        required
                        onChange={e => setEmail(e.currentTarget.value)}
                        value={email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"
                        required
                        onChange={e => setPassword(e.currentTarget.value)}
                        value={password} />
                </div>
                <button type="submit" className="btn btn-alt btn-block">Login</button>

                <div className="form-alt-action">
                    <span className='text-body'>Don't have an account ?</span>
                    <a className='link-positive'>Sign up</a>
                </div>
            </form>
        </div>
    )
}

export default LoginPage