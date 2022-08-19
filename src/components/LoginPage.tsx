import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContextType, useAuth } from './AuthProvider'
import LoadingIndicator from './LoadingIndicator'

type Props = {}

const LoginPage = (props: Props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const location = useLocation()
    // let from = location.state?.from?.pathname || "/";

    const auth: AuthContextType = useAuth()

    let navigate = useNavigate();

    function onLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('login', event);

        setLoading(true);
        auth.login(email, password).then(() => {
            navigate('/');
        }).catch(err => {
            console.error(err)
            window.alert('login failed')
        }).finally(() => setLoading(false))

    }


    return (
        <>
            <div id='login-form' className="container">
                <h4>Welcome <em>back!</em></h4>
                <p className="body-text">
                    Thank you for coming back. Hope you have a godo day and inspire others.
                </p>

                <form onSubmit={onLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <textarea placeholder='example@net.com' type="email" className="form-control"
                            id="email" aria-describedby="emailHelp"
                            required
                            onChange={e => setEmail(e.currentTarget.value)}
                            value={email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <textarea type="password" className="form-control" id="password"
                            required
                            onChange={e => setPassword(e.currentTarget.value)}
                            value={password} />
                    </div>
                    <button type="submit" className="btn btn-alt btn-block">Login</button>

                    <div className="form-alt-action">
                        <span className='text-body'>Don't have an account ?</span>
                        <Link to='/signup' className='link-positive'>Sign up</Link>
                    </div>
                </form>
            </div>
            <LoadingIndicator loading={loading} />
        </>
    )
}

export default LoginPage