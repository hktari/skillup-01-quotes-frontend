import React, { useState, useEffect } from 'react'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'
import { Quote, User } from '../services/interface'


const LandingPage = () => {
    const [quotes, setQuotes] = useState<Quote[]>([])

    useEffect(() => {
        async function fetchQuotes() {
            const quotes = await quotesApi.all()
            setQuotes(quotes);
        }
        fetchQuotes();
    }, [true])

    const RenderedQuotes = () => {
        return quotes.map(q => (
            <QuoteComponent id={q.id} voteCount={q.voteCount} voteState={q.voteState} text={q.text} user={q.user} />
        ))
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
                hi
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
                        <QuoteComponent id={q.id} voteCount={q.voteCount} voteState={q.voteState} text={q.text} user={q.user} />
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