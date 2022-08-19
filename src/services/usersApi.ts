import { useAuth } from "../components/AuthProvider";
import { api_endpoint, getHeaders } from "./common";
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


const usersApi = {
    loadMyProfile
}

export default usersApi;