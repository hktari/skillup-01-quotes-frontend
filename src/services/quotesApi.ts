import { Quote } from "./interface";

import config from '../config.json'

// todo: move to config
const quotes_api_endpoint: URL = new URL(config.API_ENDPOINT)


async function all(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const url = new URL(`?startIdx=${startIdx}&pageSize=${pageSize}`, quotes_api_endpoint)
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
    const url = new URL('/quotes/most-liked', quotes_api_endpoint)
    console.log('getMostLikedQuotes', url.href);
    const response = await fetch(url.href, { method: 'GET' })
    return await response.json();
}

async function getMostRecentQuotes(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const url = new URL('/quotes/most-recent', quotes_api_endpoint)
    console.log('getMostRecentQuotes', url.href);
    const response = await fetch(url.href, { method: 'GET' })
    return await response.json();
}

async function add(text: string): Promise<Quote> {
    const payload = { text };
    const url = new URL(`${quotes_api_endpoint}`)
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

