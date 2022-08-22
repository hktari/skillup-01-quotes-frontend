import { userInfo } from 'os'
import React, { useEffect, useState } from 'react'
import { User } from '../services/interface'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import authApi from '../services/authApi'
import profilePlaceholder from '../assets/images/profilePlaceholder.webp'
import HeaderLoginButtons from './HeaderLoginButtons'
import HeaderSignupButtons from './HeaderSignupButtons'
import HeaderLoggedInButtons from './HeaderLoggedInButtons'
import HeaderNewUserLandingPageButtons from './HeaderNewUserLandingPageButtons'

enum HeaderType {
    Login,
    Signup,
    LandingPageNewUser,
    LoggedIn
}

const Header = () => {
    const [sideMenuOpen, setSideMenuOpen] = useState(false)

    // listen for navigation events
    const location = useLocation();
    useEffect(() => {
        setSideMenuOpen(false);
    }, [location])

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
    const { user, logout, isLoggedIn } = useAuth()

    let headerType: HeaderType = HeaderType.LandingPageNewUser

    const curPagePath = location.pathname
    if (isLoggedIn()) {
        headerType = HeaderType.LoggedIn
    }
    else if (curPagePath.includes('login')) {
        headerType = HeaderType.Login
    } else if (curPagePath.includes('signup')) {
        headerType = HeaderType.Signup
    } else {
        headerType = HeaderType.LandingPageNewUser
    }


    return (
        <>
            <header>
                <div className="btn-wrapper d-none d-md-block">
                    {headerType === HeaderType.Login ? <HeaderLoginButtons /> :
                        headerType === HeaderType.Signup ? <HeaderSignupButtons /> :
                            headerType === HeaderType.LoggedIn ? <HeaderLoggedInButtons /> :
                                <HeaderNewUserLandingPageButtons />
                    }
                </div>
                <div className="btn-wrapper d-md-none">
                    <button type="button"
                        className='btn-toggle'
                        onClick={() => toggleSideMenu()}>
                        <i className="bi bi-list"></i>
                    </button>
                </div>
                <Link to="/" className='title-brand'>
                    <h3>Quotastic<i className="bi bi-quote"></i></h3>
                </Link>
                <div className={isLoggedIn() ? 'btn-wrapper' : 'd-none'}>
                    <button type="button"
                        disabled={!isLoggedIn()}
                        className='btn-add'
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
            </header>

            <nav id='side-menu' className={sideMenuOpen ? 'd-md-none open' : 'd-md-none'}>
                <div className="header">
                    <button type="button"
                        onClick={() => toggleSideMenu()}
                        className='btn-toggle'
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className='bi bi-x'></i>
                    </button>
                    <div className={isLoggedIn() ? "user-profile" : 'user-profile d-none'} >
                        <img src={user?.userProfileImg ?? profilePlaceholder} alt="" />
                        <h5>{user?.username}</h5>
                    </div>
                </div>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link to="/dashboard">
                            Home
                            <i className="bi bi-chevron-right"></i>
                        </Link>
                    </li>
                    {isLoggedIn() ? (
                        <>
                            <li className='nav-item'>
                                <button className='btn-list' data-bs-toggle="modal" data-bs-target="#profile-settings-modal">
                                    Settings <i className="bi bi-chevron-right"></i>
                                </button>

                            </li>
                            <li className='nav-item nav-item-alt'>
                                <button className='btn btn-link' onClick={() => onLogout()}>Logout</button>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-positive btn-block" to='/signup'>
                                Sign up
                            </Link>
                            <Link to='/login' className="btn btn-alt btn-block">
                                Login
                            </Link>
                        </>)}
                </ul>
            </nav>
        </>
    )
}

export default Header