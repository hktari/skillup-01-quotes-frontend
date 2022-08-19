import React, { useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { User } from '../services/interface';
import profilePlaceholder from '../assets/images/profilePlaceholder.webp';

type Props = {
}

const UserProfilePage = (props: Props) => {
    const params = useParams()
    const location = useLocation()
    const user = location.state as User
    const [quoteCount, setQuoteCount] = useState(0)

    return (
        <>
            <section className='user-profile-header'>
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
            <section className="user-profile-quotes">

            </section>
            <div>{params.id}</div>
            {JSON.stringify(location.state)}
        </>
    )
}

export default UserProfilePage