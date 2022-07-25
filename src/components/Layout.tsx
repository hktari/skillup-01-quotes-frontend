import React from 'react'
import { Outlet } from 'react-router-dom'
import { User } from '../services/interface'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
    user: User | null
}

const Layout = ({user}: LayoutProps) => {
    return (
        <>
            <div className="page-wrapper">
                <Header user={user} />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>)
}

export default Layout