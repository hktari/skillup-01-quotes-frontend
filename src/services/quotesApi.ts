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

async function getRandomQuote() : Promise<Quote> {
    const quotes = await all();
    let randIdx = Math.round(Math.random() * quotes.length)
    return quotes[randIdx];
}

const quotesApi = {
    all,
    getRandomQuote
}

export default quotesApi;

