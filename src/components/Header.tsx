import { userInfo } from 'os'
import React, { useState } from 'react'
import { User } from '../services/interface'

type HeaderProps = {
    user: User | null
}

const Header = (props: HeaderProps) => {
    const [sideMenuOpen, setSideMenuOpen] = useState(false)

    function toggleSideMenu() {
        setSideMenuOpen(!sideMenuOpen);
        console.log('toggling menu');
    }

    const isLoggedIn = () => props.user !== null;

    return (
        <>
            <header>
                <div className="btn-wrapper">
                    <button type="button"
                        className='btn-toggle'
                        onClick={() => toggleSideMenu()}>
                        <i className="bi bi-list"></i>
                    </button>
                </div>
                <a href="/#" className='title-brand' >
                    <h3>Quotastic<i className="bi bi-quote"></i></h3>
                </a>
                <div className={isLoggedIn() ? 'btn-wrapper' : 'd-none'}>
                    <button type="button"
                        className='btn-add'>
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
            </header>

            <nav id='side-menu' className={sideMenuOpen ? 'open' : ''}>
                <div className="header">
                    <button type="button"
                        onClick={() => toggleSideMenu()}
                        className='btn-toggle'
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className='bi bi-x'></i>
                    </button>
                    <div className={isLoggedIn() ? "user-profile" : 'user-profile d-none'} >
                        <img src={props.user?.profileImg.thumbnailUrl} alt="" />
                        <h5>{props.user?.username}</h5>
                    </div>
                </div>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <a aria-current="page" href="#">Home</a>
                        <i className="bi bi-chevron-right"></i>
                    </li>
                    {isLoggedIn() ? (
                        <>
                            <li className='nav-item'>
                                <a href="#">Settings</a>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                            <li className='nav-item nav-item-alt'>
                                <a href="#">Logout</a>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-positive btn-block">
                                Sign up
                            </button>
                            <button className="btn btn-alt btn-block">Login</button>
                        </>)}
                </ul>
            </nav>
        </>
    )
}

export default Header