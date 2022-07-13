import React from 'react'
import { User } from '../services/interface'

type HeaderProps = {
    user: User | null
}

const Header = (props: HeaderProps) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Quotastic</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            {props.user ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Settings</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Logout</a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-positive">
                                        Sign up
                                    </button>
                                    <button className="btn btn-outlined">Login</button>
                                </>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header