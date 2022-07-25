import React from 'react'
import { Outlet } from 'react-router-dom'
import { User } from '../services/interface'
import Footer from './Footer'
import Header from './Header'


const Layout = () => {
    return (
        <>
            <div className="page-wrapper">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>)
}

export default Layout