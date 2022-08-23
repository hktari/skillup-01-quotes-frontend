import React, { useEffect, useState } from 'react'
import { Quote, User, VoteState } from '../services/interface'
import quotesApi from '../services/quotesApi'
import profilePlaceholder from '../assets/images/profilePlaceholder.webp'
import { Link as a, useNavigate, useNavigationType } from 'react-router-dom'
import UserProfilePage from './UserProfilePage'
import { useAuth } from './AuthProvider'

interface QuoteParams {
    quote: Quote | null
}

const QuoteComponent = ({ quote }: QuoteParams) => {
    const navigate = useNavigate()
    const [voteCount, setVoteCount] = useState(0)
    const [canCastVote, setCanCastVote] = useState(false)
    const { user, isLoggedIn } = useAuth()

    // initialization
    useEffect(() => {
        setVoteCount(quote?.voteCount ?? 0)
        setCanCastVote(isLoggedIn())
    }, [quote, isLoggedIn()])


    async function castVote(vote: VoteState) {
        try {
            if (quote === null) {
                console.log("can't cast vote. Quote is null")
                return;
            }

            const quoteId = quote?.id
            const { voteCount: voteCountUpdate } = await quotesApi.castVote(quoteId, vote)
            setVoteCount(voteCountUpdate)
        } catch (error) {
            console.error(error)
            window.alert('Failed to cast vote')
        }
    }

    function onUserProfileClicked() {
        navigate('/userProfile/' + quote?.user.id, {
            state: quote?.user
        })
    }

    function QuoteCard({ id, voteState, voteCount, text, user }: Quote) {
        return (
            <>
                <div className="voting">
                    <button className={voteState === VoteState.upvoted ? 'selected' : ''}
                        disabled={!canCastVote}
                        onClick={() => castVote(VoteState.upvoted)} >
                        <i className="bi bi-chevron-up"></i>
                    </button>
                    <span>{voteCount}</span>
                    <button className={voteState === VoteState.downvoted ? 'selected' : ''}
                        disabled={!canCastVote}
                        onClick={() => castVote(VoteState.downvoted)}>
                        <i className="bi bi-chevron-down"></i>
                    </button>
                </div>
                <div className="details">
                    <p>{text}</p>
                    <div className="user-profile" onClick={() => onUserProfileClicked()}>
                        <img className='profile-icon' src={user.userProfileImg ?? profilePlaceholder} alt="" />
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
            {quote ? <QuoteCard id={quote.id} voteState={quote.voteState} voteCount={voteCount} text={quote.text} user={quote.user} />
                : <QuoteLoading />
            }
        </div>
    )
}

export default QuoteComponent