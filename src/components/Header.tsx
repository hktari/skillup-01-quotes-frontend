import { userInfo } from 'os'
import React, { useState } from 'react'
import { User } from '../services/interface'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import authApi from '../services/authApi'


const Header = () => {
    const [sideMenuOpen, setSideMenuOpen] = useState(false)

    function toggleSideMenu() {
        setSideMenuOpen(!sideMenuOpen);
        console.log('toggling menu');
    }
    async function onLogout() {
        await logout();
        setSideMenuOpen(false);
        navigate('/login')
    }

    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const isLoggedIn = () => user !== null;

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
                <Link to="/" className='title-brand' >
                    <h3>Quotastic<i className="bi bi-quote"></i></h3>
                </Link>
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
                        <img src={user?.profileImg.thumbnailUrl} alt="" />
                        <h5>{user?.username}</h5>
                    </div>
                </div>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link aria-current="page" to="/">Home</Link>
                        <i className="bi bi-chevron-right"></i>
                    </li>
                    {isLoggedIn() ? (
                        <>
                            <li className='nav-item'>
                                <Link to="#">Settings</Link>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                            <li className='nav-item nav-item-alt'>
                                <button onClick={() => onLogout()}>Logout</button>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-positive btn-block">
                                <Link to='/signup'>Sign up</Link>
                            </button>
                            <button className="btn btn-alt btn-block">
                                <Link to='/login'>Login</Link>
                            </button>
                        </>)}
                </ul>
            </nav>
        </>
    )
}

export default Header