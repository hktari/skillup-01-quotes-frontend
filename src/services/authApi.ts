import { User } from "./interface";

// todo: move to config
const api_endpoint: string = "http://localhost:3004/users"

function isLoggedIn(){
    return true;
}

async function login(username: string, password: string) : Promise<User | null>{
    const response = await fetch(api_endpoint, { method: "GET" })
    const users = await response.json();
    
    return users[0] as User;
}

let authApi = {
    login,
    isLoggedIn
}

export default authApi