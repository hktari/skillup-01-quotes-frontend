import { getJSDocOverrideTagNoCache } from "typescript";
import { useAuth } from "../components/AuthProvider";
import { APIError, api_endpoint, getHeaders } from "./common";
import { Quote, QuotesList, User } from "./interface";

async function loadMyProfile(): Promise<boolean> {
    const url = new URL("/me", api_endpoint);
    const response = await fetch(url.href, {
        method: 'GET',
        headers: getHeaders()
    })

    if (response.ok) {
        const userProfile = await response.json();

        console.debug('user: ', userProfile)
        return userProfile
    } else {
        throw new Error('failed to load user profile')
    }
}

async function getUser(id: number): Promise<User> {
    const url = new URL('/users/' + id, api_endpoint)
    const response = await fetch(url.href, {
        method: 'GET',
        headers: getHeaders()
    })
    if (response.ok) {
        return (await response.json()) as User
    } else {
        throw new APIError('failed to retrieve user with id ' + id, response.statusText)
    }
}

async function getUserLikedQuotes(id: number, startIdx: number = 0, pageSize: number = 10): Promise<QuotesList> {
    const url = new URL(`/users/${id}/liked-quotes?startIdx=${startIdx}&pageSize=${pageSize}`, api_endpoint)
    const response = await fetch(url.href, {
        method: 'GET',
        headers: getHeaders()
    })

    if (response.ok) {
        return (await response.json()) as QuotesList
    } else {
        throw new APIError(`failed to get liked quotes for user ${id}`, response.statusText)
    }
}

const usersApi = {
    loadMyProfile,
    getUser,
    getUserLikedQuotes
}

export default usersApi;