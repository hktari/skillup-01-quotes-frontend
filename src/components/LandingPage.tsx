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
    const [lastQuoteCount, setLastQuoteCount] = useState(0)

    function QuoteOfTheDay() {
        return (
            <QuoteComponent quote={quoteOfTheDay} />
        )
    }

    async function loadMostLikedQuotes(startIdx: number, pageSize: number): Promise<QuotesList> {
        try {
            return await quotesApi.getMostLikedQuotes(startIdx, pageSize)
        } catch (error) {
            console.error(error)
            window.alert('Error occured loading quotes')
            return EmptyQuotesList()
        }
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

    async function loadMostRecentQuotes(startIdx: number, pageSize: number): Promise<QuotesList> {
        try {
            return await quotesApi.getMostRecentQuotes(startIdx, pageSize)
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

                    <QuotesListComponent loadMoreItems={loadMostUpvotedQuotes} needsUpdate={quoteCount} />
                </section>
            </div>
            <div className="d-md-none">
                <section id="most-liked-quotes">
                    <h5 className='text-center text-color-primary'>Most liked quotes</h5>
                    <p className="text-body text-center">
                        Most liked quotes on the platform.  Sign up or login to like the quotes  and keep them saved in your profile
                    </p>
                    <QuotesListComponent loadMoreItems={loadMostLikedQuotes} needsUpdate={quoteCount} />
                </section>
                <section id="most-recent-quotes">
                    <h5 className='text-color-primary'>Most recent quotes</h5>
                    <p className="text-body">
                        Recent quotes updates as soon user adds new quote. Go ahed show them that you seen the new quote and like the ones you like.
                    </p>
                    <QuotesListComponent loadMoreItems={loadMostRecentQuotes} needsUpdate={quoteCount} />
                </section>
            </div>
            <div className="white-space"></div>
        </div>
    )
}

export default LandingPage