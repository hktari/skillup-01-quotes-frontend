import { User } from "./interface";
import { errorMonitor } from "events";
import { Exception } from "sass";
import { json } from "stream/consumers";
import { APIError, api_endpoint, getHeaders } from "./common";

async function login(email: string, password: string): Promise<User> {
    try {
        const url = new URL('/login', api_endpoint);
        const response = await fetch(url.href, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                email, password,
            })
        })

        if (response.ok) {
            const user = await response.json();
            setToken(user.token);
            return user as User
        } else {
            const error = await response.json()
            throw new APIError(error)
        }
    } catch (error) {
        console.error('Failed to execute login request')
        console.error(error);
        throw new APIError((error as Error).message)
    }
}

async function logout() {
    clearToken()
    return new Promise((res, rej) => res(true));
}


interface APIResult<TResult> {
    result: TResult,
    errors: string | null
}

function setToken(jwt: string) {
    console.log('setting token: ' + jwt)
    localStorage.setItem('token', jwt);
}
function clearToken() {
    localStorage.removeItem('token')
}

async function signup(username: string, password: string, email: string, userProfileImg: MediaImage | null = null): Promise<boolean> {
    console.debug('signup')

    const url = new URL('/signup', api_endpoint)

    try {
        const response = await fetch(url.href, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                username,
                password,
                email,
                userProfileImg
            })
        })

        const responseBody = await response.json();

        if (!response.ok) {
            throw new APIError(responseBody.error)
        }

        return true;
    } catch (error: any) {
        console.error('Error doing signup', error);
        throw new APIError((error as Error).message)
    }
}

let authApi = {
    login,
    logout,
    signup,
}

export default authApi