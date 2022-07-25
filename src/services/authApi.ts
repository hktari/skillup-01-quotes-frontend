import { User } from "./interface";

// todo: move to config
const api_endpoint: string = "http://localhost:3004/users"

function isLoggedIn(){
    return true;
}

async function login(username: string, password: string) : Promise<User>{
    const response = await fetch(api_endpoint, { method: "GET" })
    const users = await response.json();
    
    return users[0] as User;
}

async function logout() {
    return new Promise((res, rej) => res(true));
}

let authApi = {
    login,
    isLoggedIn,
    logout
}

export default authApi