import React, { useState, useEffect } from 'react'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'
import { Quote, User } from '../services/interface'
import FeaturedQuoteComponent, { FeaturedQuoteProps } from './FeaturedQuoteComponent'
import { Link } from 'react-router-dom'


const LandingPage = () => {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [featuredQuoteProps, setFeaturedQuoteParams] = useState<FeaturedQuoteProps>({ top: null, bottom: null, featured: null })

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
        <div className='container'>
            <section id="welcome">
                <h4>Welcome<br /> to <em>Quotastic</em></h4>
                <h5>
                    Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.
                </h5>
                <Link to='/signup' className="btn btn-positive">
                    Sign up
                </Link>
            </section>

            <section id="featured-quote">
                <RenderFeaturedQuote featured={featuredQuoteProps.featured} top={featuredQuoteProps.top} bottom={featuredQuoteProps.bottom} />
            </section>

            <section id="explore-quotes">
                <h4 className='text-center'>Explore the world of <em>fantastic quotes</em> </h4>

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
                <div className="white-space">

                </div>
            </section >
        </div>
    )
}

export default LandingPage