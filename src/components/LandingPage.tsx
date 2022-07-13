import React, { useState, useEffect } from 'react'
import quotesApi from '../services/quotesApi'
import QuoteComponent from './QuoteComponent'
import { Quote } from '../services/interface'

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
        <div><h1>Quotes</h1>
            {
                quotes.map(q => (
                    <QuoteComponent id={q.id} voteCount={q.voteCount} voteState={q.voteState} text={q.text} user={q.user} />
                ))
            }    </div>
    )
}

export default LandingPage