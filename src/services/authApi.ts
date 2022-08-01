import { User } from "./interface";
import config from '../config.json'
import { errorMonitor } from "events";
import { Exception } from "sass";
import { json } from "stream/consumers";

// todo: move to config
const api_endpoint = new URL(config.API_ENDPOINT)

async function login(email: string, password: string): Promise<User> {
    const url = new URL('/login', api_endpoint);
    const response = await fetch(url.href, {
        method: "POST", body: JSON.stringify({
            email, password,
        })
    })
    const users = await response.json();

    return users[0] as User;
}

async function logout() {
    return new Promise((res, rej) => res(true));
}


interface APIResult {
    errors: string | null
}

async function signup(username: string, password: string, email: string, userProfileImg: MediaImage | null = null): Promise<APIResult> {
    console.debug('signup')

    const url = new URL('/signup', api_endpoint)

    // TODO: hash password
    
    try {
        const response = await fetch(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username,
                password,
                email,
                userProfileImg
            })
        })

        const responseBody = await response.json();

        if (!response.ok) {
            return {
                errors: responseBody.error
            }
        } else {
            return {
                errors: null
            }
        }
    } catch (error: any) {
        console.error('Error doing signup', error);
        return {
            errors: error.toString()
        }
    }
}

let authApi = {
    login,
    logout,
    signup
}

export default authApi