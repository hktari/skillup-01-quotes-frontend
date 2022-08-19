import { useAuth } from "../components/AuthProvider";
import { APIError, api_endpoint, getHeaders } from "./common";
import { User } from "./interface";

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

const usersApi = {
    loadMyProfile,
    getUser
}

export default usersApi;