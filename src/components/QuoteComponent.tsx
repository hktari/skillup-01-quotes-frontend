import React from 'react'
import { Quote, User } from '../services/interface'

const QuoteComponent = ({ id, text, user, voteCount, voteState }: Quote) => {
    console.log(user);
    console.log(user.profileImg.thumbnailUrl);
    return (
        <div className='quote-card'>
            <div className="votes">

            </div>
            <div className="details">
                <p>{text}</p>
                <div className="user-profile">
                    <img src={user.profileImg.thumbnailUrl} alt="" />
                    <span>{user.username}</span>
                </div>
            </div>
        </div>
    )
}

export default QuoteComponent