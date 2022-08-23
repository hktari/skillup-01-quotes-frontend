import React, { useEffect, useState } from 'react'
import authApi from '../services/authApi'
import { Quote, QuotesList, User } from '../services/interface'
import quotesApi from '../services/quotesApi'
import { EmptyQuotesList } from '../util/util'
import { AuthContextType, useAuth } from './AuthProvider'
import QuoteComponent from './QuoteComponent'
import QuotesListComponent from './QuotesListComponent'
import { useQuotes } from './QuotesProvider'


const LandingPage = () => {
    const { user } = useAuth();
    const { quoteCount } = useQuotes();
    const [quoteOfTheDay, setQuoteOfTheDay] = useState<Quote | null>(null)
    const [mostLikedQuotes, setMostLikedQuotes] = useState<Quote[]>([])
    const [mostRecentQuotes, setMostRecentQuotes] = useState<Quote[]>([])

    console.log('refreshing LandingPage...')

    useEffect(() => {
        async function fetchRandomQuote() {
            setQuoteOfTheDay(await quotesApi.getRandomQuote())
        }
        fetchRandomQuote();
    }, [user])

    useEffect(() => {
        // todo: pagination

        async function fetchMostLikedQuotes() {
            setMostLikedQuotes(await quotesApi.getMostLikedQuotes())

        }

        fetchMostLikedQuotes();
    }, [user])

    useEffect(() => {
        console.log('refreshing most recent quotes...')

        // todo: pagination
        async function fetchMostRecentQuotes() {
            setMostRecentQuotes(await quotesApi.getMostRecentQuotes())
        }
        fetchMostRecentQuotes();
    }, [user, quoteCount])


    function QuoteOfTheDay() {
        return (
            <QuoteComponent quote={quoteOfTheDay} />
        )
    }

    function MostLikedQuotes() {
        return (
            <div className="quotes-list">
                {mostLikedQuotes.map(q => <QuoteComponent key={q.id} quote={q} />)}

                <button className="btn btn-alt centered btn-wide">
                    load more
                </button>
            </div>
        )
    }

    function MostRecentQuotes() {
        return (
            <div className="quotes-list">
                {mostRecentQuotes.map(q => <QuoteComponent key={q.id} quote={q} />)}

                <button className="btn btn-alt centered btn-wide">
                    load more
                </button>
            </div>
        )
    }

    async function loadMostUpvotedQuotes(startIdx: number, pageSize: number): Promise<QuotesList> {
        try {
            return await quotesApi.getMostUpvotedQuotes(startIdx, pageSize)
        } catch (error) {
            console.error(error)
            window.alert('Error occured loading quotes')
            return EmptyQuotesList()
        }
    }


    return (
        <div id='landing-page' className="container">
            <section id="quote-of-the-day">
                <h4>Quote of the day</h4>
                <p className="text-body text-center">
                    Quote of the day is randomly chosen quote
                </p>
                <QuoteOfTheDay />
            </section>


            <div className="d-none d-md-block">
                <section id="most-upvoted-quotes">
                    <h4><em>Most upvoted quotes</em></h4>
                    <p className="text-body text-center">Most upvoted quotes on the platform.
                        Give a like to the ones you like to<br />
                        keep them saved in your profile.</p>

                    <QuotesListComponent loadMoreItems={loadMostUpvotedQuotes} />
                </section>
            </div>
            <div className="d-md-none">
                <section id="most-liked-quotes">
                    <h5 className='text-center text-color-primary'>Most liked quotes</h5>
                    <p className="text-body text-center">
                        Most liked quotes on the platform.  Sign up or login to like the quotes  and keep them saved in your profile
                    </p>
                    <MostLikedQuotes />
                </section>
                <section id="most-recent-quotes">
                    <h5 className='text-color-primary'>Most recent quotes</h5>
                    <p className="text-body">
                        Recent quotes updates as soon user adds new quote. Go ahed show them that you seen the new quote and like the ones you like.
                    </p>
                    <MostRecentQuotes />
                </section>
            </div>
            <div className="white-space"></div>
        </div>
    )
}

export default LandingPage