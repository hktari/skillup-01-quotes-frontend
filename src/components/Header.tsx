import { userInfo } from 'os'
import React from 'react'
import { User } from '../services/interface'

type HeaderProps = {
    user: User | null
}

const Header = (props: HeaderProps) => {
    return (
        <>
            <header>
                <nav>
                    <div>
                        <a href="#" className='title-brand' ><h3>Quotastic<i className="bi bi-quote"></i></h3>
                        </a>
                        <button type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i>OPEN/CLOSE</i>
                        </button>
                    </div>
                </nav>
            </header>
            <div className="side-menu">
                <div className="header">
                    <button type="button"
                        className='btn-toggle'
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className='bi bi-x'></i>
                    </button>
                    <div className="user-profile">
                        <img src={props.user?.profileImg.thumbnailUrl} alt="" />
                        <h5>{props.user?.username}</h5>
                    </div>
                </div>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <a aria-current="page" href="#">Home</a>
                        <i className="bi bi-chevron-right"></i>
                    </li>
                    {props.user ? (
                        <>
                            <li className='nav-item'>
                                <a href="#">Settings</a>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                            <li className='nav-item'>
                                <a href="#">Logout</a>
                                <i className="bi bi-chevron-right"></i>
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
        </>
    )
}

export default Header