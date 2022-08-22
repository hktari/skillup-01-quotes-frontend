import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const HeaderLoginButtons = (props: Props) => {
    return (
        <>
            <Link to={'/signup'}><button className='btn btn-positive btn-wide'>Sign up</button></Link>
        </>)
}

export default HeaderLoginButtons