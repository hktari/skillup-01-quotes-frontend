import React, { useState, useEffect } from 'react'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'
import { Quote, User } from '../services/interface'
import FeaturedQuoteComponent, { FeaturedQuoteProps } from './FeaturedQuoteComponent'


const LandingPage = () => {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [featuredQuoteParams, setFeaturedQuoteParams] = useState<FeaturedQuoteProps>({ top: null, bottom: null, featured: null })

    useEffect(() => {
        async function fetchQuotes() {
            const quotes = await quotesApi.all()
            setQuotes(quotes);

            // todo: get featured quote
            setFeaturedQuoteParams({ top: quotes[0], bottom: quotes[0], featured: quotes[0] })
        }
        fetchQuotes();
    }, [true])

    function RenderFeaturedQuote() {
        return (
            // todo: why is cast necessary ?
            <FeaturedQuoteComponent featured={featuredQuoteParams.featured} top={featuredQuoteParams.top} bottom={featuredQuoteParams.bottom} />
        )
    }

    return (
        <div className='container'>
            <section id="welcome">
                <h4>Welcome<br /> to <em>Quotastic</em></h4>
                <h5>
                    Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.
                </h5>
                <button className="btn btn-positive">
                    Sign up
                </button>
            </section>

            <section id="featured-quote">
                <RenderFeaturedQuote />
            </section>

            <section id="explore-quotes">
                <h4 className='text-center'>Explore the world of <em>fantastic quotes</em> </h4>

                <h5 className='text-center text-color-primary'>Most liked quotes</h5>
                <p className="text-body text-center">
                    Most liked quotes on the platform.
                    Sign up or login to like the quotes
                    and keep them saved in your profile

                </p>
                {
                    quotes.map(q => (
                        <QuoteComponent quote={q} />
                    ))
                }

                <button className="btn btn-alt centered">Sign up to see more</button>
                <div className="white-space">

                </div>
            </section >
        </div>
    )
}

export default LandingPage