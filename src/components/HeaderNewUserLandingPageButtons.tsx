import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const HeaderNewUserLandingPageButtons = (props: Props) => {
    return (
        <>
            <Link to='/signup'>
                <button className="btn btn-wide btn-positive me-3">Sign up</button>
            </Link>
            <Link to='/login'>
                <button className="btn btn-wide btn-alt">Login</button>
            </Link>
        </>
    )
}

export default HeaderNewUserLandingPageButtons