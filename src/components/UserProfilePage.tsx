import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { Quote, User } from '../services/interface';
import profilePlaceholder from '../assets/images/profilePlaceholder.webp';
import QuoteComponent from './QuoteComponent';
import quotesApi from '../services/quotesApi';
import QuotesListComponent from './QuotesListComponent';
import usersApi from '../services/usersApi';

type Props = {
}

const UserProfilePage = (props: Props) => {
    const params = useParams()
    const location = useLocation()
    const user = location.state as User
    const [quoteCount, setQuoteCount] = useState(0)

    const [mostLikedQuotes, setMostLikedQuotes] = useState<Quote[]>([])
    const [mostRecentQuotes, setMostRecentQuotes] = useState<Quote[]>([])

    useEffect(() => {
        const getMostLikedQuotes = async () => {
            setMostLikedQuotes(await quotesApi.getMostLikedQuotes(user.id))
        }
        getMostLikedQuotes()
    }, [user.id, mostLikedQuotes])

    useEffect(() => {
        const getMostRecentQuotes = async () => {
            setMostRecentQuotes(await quotesApi.getMostRecentQuotes(user.id))
        }
        getMostRecentQuotes()
    }, [user.id, mostRecentQuotes])

    function MostLikedQuotes() {
        return (
            <div className="quotes-list">
                {mostLikedQuotes.map(q => <QuoteComponent key={q.id} quote={q} />)}

                <button className="btn btn-alt centered btn-wide">
                    load more
                </button>
            </div>
        )
    }

    function MostRecentQuotes() {
        return (
            <div className="quotes-list">
                {mostRecentQuotes.map(q => <QuoteComponent key={q.id} quote={q} />)}

                <button className="btn btn-alt centered btn-wide">
                    load more
                </button>
            </div>
        )
    }

    async function LoadUserLikedQuotes(startIdx: number, pageSize: number) {
        return await usersApi.getUserLikedQuotes(user.id, startIdx, pageSize)
    }

    return (
        <>
            <div className="user-profile">
                <section className='header'>
                    <img src={user.userProfileImg ?? profilePlaceholder} alt="" />
                    <h4>{user.username}</h4>
                    <div className="stats-container">
                        <table>
                            <tr>
                                <th className='text-body'>Quotes</th>
                                <th className='text-body'>Quotastic karma</th>
                            </tr>
                            <tr>
                                <td className='text-orange'><h5>{quoteCount}</h5> </td>
                                <td><h5>{user.karmaPoints ?? 0}</h5></td>
                            </tr>
                        </table>
                    </div>
                </section>
                <div className="container">
                    <section className="most-liked-quotes">
                        <h5><em>Most liked quotes</em></h5>
                        <MostLikedQuotes />
                    </section>
                    <section className="most-recent-quotes">
                        <h5><em>Most recent quotes</em></h5>
                        <MostRecentQuotes />
                    </section>
                    <section className="liked-quotes">
                        <h5><em>Likes</em></h5>
                        <QuotesListComponent loadMoreItems={LoadUserLikedQuotes} />
                    </section>
                </div>
            </div>
            <div className="white-space"></div>
        </>
    )
}

export default UserProfilePage