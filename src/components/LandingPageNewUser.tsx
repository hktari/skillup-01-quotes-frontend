import React, { useState, useEffect } from 'react'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'
import { Quote, User } from '../services/interface'
import FeaturedQuoteComponent, { FeaturedQuoteProps } from './FeaturedQuoteComponent'
import { Link } from 'react-router-dom'
import QuotesListComponent from './QuotesListComponent'
import { EmptyQuotesList } from '../util/util'

const LandingPage = () => {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [featuredQuoteProps, setFeaturedQuoteParams] = useState<FeaturedQuoteProps>({ top: null, bottom: null, featured: null })

    async function getMostUpvotedQuotes(startIdx: number, pageSize: number) {
        try {
            return await quotesApi.getMostUpvotedQuotes(startIdx, pageSize)
        } catch (error) {
            console.error(error)
            window.alert('Failed to fetch quotes...')
            return EmptyQuotesList()
        }
    }

    useEffect(() => {
        async function fetchQuotes() {
            const quotes = await quotesApi.getMostLikedQuotes()
            setQuotes(quotes);

            // todo: get featured quote
            console.log(quotes[0])
            setFeaturedQuoteParams({ top: quotes[0], bottom: quotes[0], featured: quotes[0] })
        }
        fetchQuotes();
    }, [true])

    function RenderFeaturedQuote({ featured, top, bottom }: FeaturedQuoteProps) {
        return (
            // todo: why is cast necessary ?
            <FeaturedQuoteComponent featured={featuredQuoteProps.featured} top={featuredQuoteProps.top} bottom={featuredQuoteProps.bottom} />
        )
    }

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
                        <RenderFeaturedQuote featured={featuredQuoteProps.featured} top={featuredQuoteProps.top} bottom={featuredQuoteProps.bottom} />
                    </section>
                </div>
            </div>


            <section id="explore-quotes">
                <h2 className="d-none d-md-block text-center">Explore the world of <br /> <em>fantastic quotes</em> </h2>
                <h4 className='d-md-none text-center'>Explore the world of <em>fantastic quotes</em> </h4>
                <div className="d-none d-md-block">
                    <h4 className="text-center"><em>Most upvoted quotes</em></h4>
                    <p className="text-body text-center">Most upvoted quotes on the platform.
                        Sign up or login to like the quotes<br />
                        and keep them saved in your profile</p>

                    <QuotesListComponent loadMoreItems={getMostUpvotedQuotes} />
                </div>
                <div className="d-md-none">
                    <h5 className='text-center text-color-primary'>Most liked quotes</h5>
                    <p className="text-body text-center">
                        Most liked quotes on the platform.
                        Sign up or login to like the quotes
                        and keep them saved in your profile

                    </p>
                    <div className="quotes-list">
                        {
                            quotes.map(q => (
                                <QuoteComponent key={q.id} quote={q} />
                            ))
                        }
                    </div>

                    <Link to='/signup' className="btn btn-alt centered">Sign up to see more</Link>
                </div>
                <div className="white-space">
                </div>
            </section >
        </div>
    )
}

export default LandingPage