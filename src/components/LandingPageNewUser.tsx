import React, { useState, useEffect } from 'react'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'
import { Quote, QuotesList, User } from '../services/interface'
import FeaturedQuoteComponent, { FeaturedQuoteProps } from './FeaturedQuoteComponent'
import { Link } from 'react-router-dom'
import QuotesListComponent from './QuotesListComponent'
import { EmptyQuotesList } from '../util/util'

const LandingPage = () => {
    const [featuredQuoteProps, setFeaturedQuoteParams] = useState<FeaturedQuoteProps>({ top: null, bottom: null, featured: null })


    function getQuotesOrEmptyList(getQuotesFunc: (startIdx: number, pageSize: number) => Promise<QuotesList>) {
        return async function (startIdx: number, pageSize: number): Promise<QuotesList> {
            try {
                return await getQuotesFunc(startIdx, pageSize)
            } catch (error) {
                console.error(error)
                window.alert('Failed to fetch quotes...')
                return EmptyQuotesList()
            }
        }
    }

    useEffect(() => {
        async function fetchQuotes() {
            const quote = await quotesApi.getRandomQuote()

            setFeaturedQuoteParams({ top: quote, bottom: quote, featured: quote })
        }
        fetchQuotes();
    }, [])

    return (
        <div id='landing-page-new-user' className='container'>
            <div className="row">
                <div className="col col-sm-12 col-md-6">
                    <section id="welcome">
                        <h1 className='d-none d-md-block'>Welcome<br /> to <em>Quotastic</em></h1>
                        <h4 className='d-md-none'>Welcome<br /> to <em>Quotastic</em></h4>
                        <h5>
                            Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.
                        </h5>
                        <Link to='/signup' >
                            <button className="btn btn-positive">Sign up</button>
                        </Link>
                    </section>
                </div>
                <div className="col-sm-12 col-md-2"></div>
                <div className="col-sm-12 col-md-4">
                    <section id="featured-quote">
                        <FeaturedQuoteComponent featured={featuredQuoteProps.featured} top={featuredQuoteProps.top} bottom={featuredQuoteProps.bottom} />
                    </section>
                </div>
            </div>


            <section id="explore-quotes">
                <h2 className="d-none d-md-block text-center">Explore the world of <br /> <em>fantastic quotes</em> </h2>
                <h4 className='d-md-none text-center'>Explore the world of <em>fantastic quotes</em> </h4>
                {/* desktop */}
                <div className="d-none d-md-block">
                    <h4 className="text-center"><em>Most upvoted quotes</em></h4>
                    <p className="text-body text-center">Most upvoted quotes on the platform.
                        Sign up or login to like the quotes<br />
                        and keep them saved in your profile</p>

                    <QuotesListComponent loadMoreItems={getQuotesOrEmptyList(quotesApi.getMostUpvotedQuotes)} />
                </div>
                {/* mobile */}
                <div className="d-md-none">
                    <h5 className='text-center text-color-primary'>Most liked quotes</h5>
                    <p className="text-body text-center">
                        Most liked quotes on the platform.
                        Sign up or login to like the quotes
                        and keep them saved in your profile

                    </p>
                    <div className="quotes-list">
                        <QuotesListComponent loadMoreItems={getQuotesOrEmptyList(quotesApi.getMostLikedQuotes)}/>
                    </div>

                    <Link to='/signup' className="btn btn-alt centered mt-5">Sign up to see more</Link>
                </div>
                <div className="white-space">
                </div>
            </section >
        </div>
    )
}

export default LandingPage