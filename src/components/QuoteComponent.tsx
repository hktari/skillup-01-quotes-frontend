import React from 'react'
import { Quote, User, VoteState } from '../services/interface'

interface QuoteParams {
    quote: Quote | null
}

const QuoteComponent = ({ quote }: QuoteParams) => {

    function QuoteCard({ id, voteState, voteCount, text, user }: Quote) {
        return (
            <>
                <div className="voting">
                    <button><i className="bi bi-chevron-up"></i></button>
                    <span>{voteCount}</span>
                    <button><i className="bi bi-chevron-down"></i></button>
                </div>
                <div className="details">
                    <p>{text}</p>
                    <div className="user-profile">
                        <img src={user.userProfileImg} alt="" />
                        <span>{user.username}</span>
                    </div>
                </div>
            </>
        )
    }
    function QuoteLoading() {
        return (
            <div className="card-loading">
                ...
            </div>
        )
    }
    return (
        <div className='quote-card'>
            {quote ? <QuoteCard id={quote.id} voteState={quote.voteState} voteCount={quote.voteCount} text={quote.text} user={quote.user} />
                : <QuoteLoading />
            }
        </div>
    )
}

export default QuoteComponent