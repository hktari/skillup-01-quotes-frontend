import React, { useEffect, useState } from 'react'
import authApi from '../services/authApi'
import { Quote, User } from '../services/interface'
import quotesApi from '../services/quotesApi'
import { AuthContextType, useAuth } from './AuthProvider'
import QuoteComponent from './QuoteComponent'


const LandingPage = () => {
    const auth = useAuth();

    const [quoteOfTheDay, setQuoteOfTheDay] = useState<Quote | null>(null)

    const [mostLikedQuotes, setMostLikedQuotes] = useState<Quote[]>([])
    const [mostLikedQuotesCurPage, setMostLikedQuotesCurPage] = useState(0)
    const [mostRecentQuotes, setMostRecentQuotes] = useState<Quote[]>([])


    useEffect(() => {
        async function fetchRandomQuote() {
            setQuoteOfTheDay(await quotesApi.getRandomQuote())
        }
        fetchRandomQuote();
    }, [true])

    useEffect(() => {
        // todo: pagination

        async function fetchMostLikedQuotes() {
            setMostLikedQuotes(await quotesApi.getMostLikedQuotes())

        }

        fetchMostLikedQuotes();
    }, [true])

    useEffect(() => {
        // todo: pagination

        async function fetchMostRecentQuotes() {
            setMostRecentQuotes(await quotesApi.getMostRecentQuotes())

        }

        fetchMostRecentQuotes();
    }, [true])


    function QuoteOfTheDay() {
        return (
            <QuoteComponent quote={quoteOfTheDay} />
        )
    }

    function MostLikedQuotes() {
        return (
            <div className="quotes-list">
                {mostLikedQuotes.map(q => <QuoteComponent quote={q} />)}

                <button className="btn btn-alt centered btn-wide">
                    load more
                </button>
            </div>
        )
    }

    function MostRecentQuotes() {
        return (
            <div className="quotes-list">
                {mostRecentQuotes.map(q => <QuoteComponent quote={q} />)}

                <button className="btn btn-alt centered btn-wide">
                    load more
                </button>
            </div>
        )
    }

    return (
        <div className="container">
            {auth.user.username}
            <section id="quote-of-the-day">
                <h4>Quote of the day</h4>
                <p className="text-body text-center">
                    Quote of the day is randomly chosen quote
                </p>
                <QuoteOfTheDay />
            </section>
            <section id="most-liked-quotes">
                <h3 className='text-center'>Most liked quotes</h3>
                <p className="text-body text-center">
                    Most liked quotes on the platform.  Sign up or login to like the quotes  and keep them saved in your profile
                </p>
                <MostLikedQuotes />
            </section>
            <section id="most-recent-quotes">
                <h5>Most recent quotes</h5>
                <p className="text-body">
                    Recent quotes updates as soon user adds new quote. Go ahed show them that you seen the new quote and like the ones you like.
                </p>
                <MostRecentQuotes />
            </section>
            <div className="white-space"></div>
        </div>
    )
}

export default LandingPage