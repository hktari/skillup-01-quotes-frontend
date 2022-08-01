import { User } from "./interface";
import config from '../config.json'

// todo: move to config
const auth_api_endpoint = new URL(config.API_ENDPOINT)

async function login(email: string, password: string): Promise<User> {
    const url = new URL('/login', auth_api_endpoint);
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



async function signup(username: string, password: string, email: string, userProfileImg: MediaImage | null = null) {
    console.debug('signup')


}

let authApi = {
    login,
    logout,
    signup
}

export default authApi