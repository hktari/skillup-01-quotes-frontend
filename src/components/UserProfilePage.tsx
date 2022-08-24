import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { Quote, QuotesList, User } from '../services/interface';
import profilePlaceholder from '../assets/images/profilePlaceholder.webp';
import QuoteComponent from './QuoteComponent';
import quotesApi from '../services/quotesApi';
import QuotesListComponent from './QuotesListComponent';
import usersApi from '../services/usersApi';
import { EmptyQuotesList } from '../util/util';
import QuotesProvider from './QuotesProvider';

type Props = {
}

const UserProfilePage = (props: Props) => {
    const params = useParams()
    const location = useLocation()
    const user = location.state as User
    const [quoteCount, setQuoteCount] = useState(0)


    function getQuotesOrEmptyList(getQuotesFunc: (startIdx: number, pageSize: number) => Promise<QuotesList>) {
        return async function (startIdx: number, pageSize: number): Promise<QuotesList> {
            try {
                return await getQuotesFunc(startIdx, pageSize)
            } catch (error) {
                console.error(error)
                window.alert('Failed to fetch quotes...')
                return EmptyQuotesList()
            }
        }
    }


    async function LoadUserLikedQuotes(startIdx: number, pageSize: number) {
        return await quotesApi.getMostLikedQuotes(startIdx, pageSize, user.id)
    }

    return (
        <>
            <div className="user-profile">
                <section className='header'>
                    <img src={user.userProfileImg ?? profilePlaceholder} alt="" />
                    <h4>{user.username}</h4>
                    <div className="stats-container">
                        <table>
                            <colgroup>
                                <th />
                                <col style={{ width: '50%' }} />
                                <col style={{ width: '50%' }} />
                            </colgroup>
                            <tr>
                                <th className='text-body'>
                                    <span>Quotes</span> </th>
                                <th className='text-body'>
                                    <span>Quotastic karma</span> </th>
                            </tr>
                            <tr>
                                <td className='text-orange'><h5>{quoteCount}</h5> </td>
                                <td><h5>{user.karmaPoints ?? 0}</h5></td>
                            </tr>
                        </table>
                    </div>
                </section>
                <div className="container body">
                    <div className="d-none d-md-block">
                        <div className="row">
                            <div className="col-md-4">
                                <section className="most-liked-quotes">
                                    <h5><em>Most liked quotes</em></h5>
                                    <QuotesListComponent loadMoreItems={getQuotesOrEmptyList(quotesApi.getMostLikedQuotes)} />
                                </section>
                            </div>
                            <div className="col-md-4">
                                <section className="most-recent-quotes">
                                    <h5><em>Most recent quotes</em></h5>
                                    <QuotesListComponent loadMoreItems={getQuotesOrEmptyList(quotesApi.getMostRecentQuotes)} />
                                </section>
                            </div>
                            <div className="col-md-4">
                                <section className="most-liked-quotes">
                                    <h5><em>Likes</em></h5>
                                    <QuotesListComponent loadMoreItems={LoadUserLikedQuotes} />
                                </section>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-none">
                        <section className="most-liked-quotes">
                            <h5><em>Most liked quotes</em></h5>
                            <QuotesListComponent loadMoreItems={getQuotesOrEmptyList(quotesApi.getMostLikedQuotes)} />
                        </section>
                        <section className="most-recent-quotes">
                            <h5><em>Most recent quotes</em></h5>
                            <QuotesListComponent loadMoreItems={getQuotesOrEmptyList(quotesApi.getMostRecentQuotes)} />
                        </section>
                        <section className="most-liked-quotes">
                            <h5><em>Likes</em></h5>
                            <QuotesListComponent loadMoreItems={LoadUserLikedQuotes} />
                        </section>
                    </div>
                </div>
            </div>
            <div className="white-space"></div>
        </>
    )
}

export default UserProfilePage