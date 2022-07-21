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
    
    const [mostLikedQuotes, setMostLikedQuotes] = useState<Quote[]>([])
    const [mostLikedQuotesCurPage, setMostLikedQuotesCurPage] = useState(0)

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
                <h3 className='text-center'>Most liked quotes</h3>
                <p className="text-body text-center">
                    Most liked quotes on the platform.  Sign up or login to like the quotes  and keep them saved in your profile
                </p>
                <MostLikedQuotes />
            </section>
            <section id="most-recent-quotes">

            </section>
        </div>
    )
}

export default LandingPage