import { userInfo } from 'os'
import React, { useEffect, useState } from 'react'
import { User } from '../services/interface'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import authApi from '../services/authApi'
import AddQuote from './AddQuote'


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
    const { user, logout } = useAuth()
    const isLoggedIn = () => user !== null;

    const [showAddQuoteModal, setShowAddQuoteModal] = useState(false)

    function onSubmitNewQuote(text : string){
        console.log("submit quote", text);
    }

    function onCancelAddQuote(){
        console.log('cancel quote');
    }

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
                <Link to="/" className='title-brand' 
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <h3>Quotastic<i className="bi bi-quote"></i></h3>
                </Link>
                <div className={isLoggedIn() ? 'btn-wrapper' : 'd-none'}>
                    <button type="button"
                        className='btn-add'
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        >
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
                        <Link to="/">
                            Home
                            <i className="bi bi-chevron-right"></i>
                        </Link>
                    </li>
                    {isLoggedIn() ? (
                        <>
                            <li className='nav-item'>
                                <Link to="#">Settings <i className="bi bi-chevron-right"></i></Link>

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
      
            <AddQuote isOpen={showAddQuoteModal} onSubmit={onSubmitNewQuote} onCancel={onCancelAddQuote}/>
        </>
    )
}

export default Header