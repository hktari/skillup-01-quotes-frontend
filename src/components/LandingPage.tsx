import React, { useEffect, useState } from 'react'
import authApi from '../services/authApi'
import { User } from '../services/interface'

type LandingPageProps = {
    user: User
}

const LandingPage = ({ user }: LandingPageProps) => {
    return (
        <div className="container">
            <section id="quote-of-the-day">
                <h4>Quote of the day</h4>
            </section>
            <section id="most-liked-quotes">

            </section>
            <section id="most-recent-quotes">

            </section>
        </div>
    )
}

export default LandingPage