import { Quote } from "./interface";

// todo: move to config
const api_endpoint: string = "http://localhost:3004/quotes"


async function all(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const url = new URL(`${api_endpoint}?startIdx=${startIdx}&pageSize=${pageSize}`)
    console.log(url.href)
    const response = await fetch(url.href, { method: "GET" })
    const quotes = await response.json();
    return quotes as Quote[];
}

async function getRandomQuote(): Promise<Quote> {
    const quotes = await all();
    let randIdx = Math.round(Math.random() * quotes.length)
    return quotes[randIdx];
}

async function getMostLikedQuotes(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const quotes = await all(startIdx, pageSize);
    quotes.sort((a, b) => a.voteCount - b.voteCount);

    return quotes
}

async function getMostRecentQuotes(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    return await all(startIdx, pageSize);
}

async function add(text: string) : Promise<Quote> {
    const payload = { text };
    const url = new URL(`${api_endpoint}`)
    const response = await fetch(url.href, { method: "POST", body: JSON.stringify(payload) })
    return await response.json();
}

const quotesApi = {
    all,
    add,
    getRandomQuote,
    getMostLikedQuotes,
    getMostRecentQuotes
}

export default quotesApi;

