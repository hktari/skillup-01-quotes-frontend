import { Quote } from "./interface";

// todo: move to config
const api_endpoint: string = "http://localhost:3004/quotes"


async function all(startIdx : number = 0, pageSize : number = 10) : Promise<Quote[]>{
    const url = new URL(`${api_endpoint}?startIdx=${startIdx}&pageSize=${pageSize}`)
    console.log(url.href)
    const response = await fetch(url.href, { method: "GET" })
    const quotes = await response.json();
    return quotes as Quote[];    
}

const quotesApi = {
    all
}

export default quotesApi;

