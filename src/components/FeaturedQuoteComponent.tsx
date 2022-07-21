import React from 'react'
import { Quote } from '../services/interface'
import QuoteComponent from './QuoteComponent'

export interface FeaturedQuoteProps {
    top: Quote | null,
    featured: Quote | null,
    bottom: Quote | null
}

const FeaturedQuoteComponent = ({ top, featured, bottom }: FeaturedQuoteProps) => {
    return (
        <div className="featured-quote-container">
            <div className="top-quote">
                <QuoteComponent quote={top} />
            </div>
            <div className="bottom-quote">
                <QuoteComponent quote={bottom} />
            </div>
            <div className="featured-quote">
                <QuoteComponent quote={featured} />
            </div>
        </div>
    )
}

export default FeaturedQuoteComponent