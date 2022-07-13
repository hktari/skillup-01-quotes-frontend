import React from 'react'
import { Quote, User } from '../services/interface'


const QuoteComponent = ({id, text, user, voteCount, voteState} : Quote) => {

    return (
        <div>
            <blockquote>
                {text}
                <cite>{user.username}</cite>
            </blockquote>
        </div>
    )
}

export default QuoteComponent