import React, { useEffect, useState } from 'react'
import authApi from '../services/authApi'
import { Quote, User } from '../services/interface'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'

type LandingPageProps = {
    user: User
}

const LandingPage = ({ user }: LandingPageProps) => {

    const [quoteOfTheDay, setQuoteOfTheDay] = useState<Quote | null>(null)

    useEffect(() => {
        async function fetchRandomQuote() {
            setQuoteOfTheDay(await quotesApi.getRandomQuote())
        }
        fetchRandomQuote();
    }, [true])

    function QuoteOfTheDay() {
        return (
            <QuoteComponent quote={quoteOfTheDay}/>
        )

    }

    return (
        <div className="container">
            <section id="quote-of-the-day">
                <h4>Quote of the day</h4>
                <p className="text-body text-center">
                    Quote of the day is randomly chosen quote
                </p>
                <QuoteOfTheDay />
            </section>
            <section id="most-liked-quotes">

            </section>
            <section id="most-recent-quotes">

            </section>
        </div>
    )
}

export default LandingPage