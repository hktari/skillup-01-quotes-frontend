import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const HeaderSignupButtons = (props: Props) => {
    return (
        <>
            <Link to={'/login'}><button className="btn btn-wide btn-alt">Login</button>
            </Link>
        </>)
}

export default HeaderSignupButtons