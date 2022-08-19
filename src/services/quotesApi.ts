import { Quote, VoteState } from "./interface";

import config from '../config.json'
import { APIError, api_endpoint, getHeaders } from "./common";


async function all(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const url = new URL(`?startIdx=${startIdx}&pageSize=${pageSize}`, api_endpoint)
    console.log(url.href)
    const response = await fetch(url.href, { method: "GET" })
    const quotes = await response.json();
    return quotes as Quote[];
}

async function getRandomQuote(): Promise<Quote> {
    const url = new URL('/quotes/random', api_endpoint)
    const httpResult = await fetch(url.href, {
        method: 'GET',
        headers: getHeaders()
    })
    if (httpResult.ok) {
        return (await httpResult.json()) as Quote
    } else {
        throw new APIError('failed to get random quote', httpResult.statusText)
    }
}

async function getMostLikedQuotes(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const url = new URL('/quotes/most-liked', api_endpoint)
    console.log('getMostLikedQuotes', url.href);
    const response = await fetch(url.href, { method: 'GET' })
    return await response.json();
}

async function getMostRecentQuotes(startIdx: number = 0, pageSize: number = 10): Promise<Quote[]> {
    const url = new URL('/quotes/most-recent', api_endpoint)
    console.log('getMostRecentQuotes', url.href);
    const response = await fetch(url.href, { method: 'GET' })
    return await response.json();
}

async function add(text: string): Promise<Quote> {
    const payload = { text };
    const url = new URL(`/me/myquote`, api_endpoint)
    const response = await fetch(url.href, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) })
    if (response.ok) {
        return (await response.json()) as Quote
    } else {
        throw new APIError('failed to add quote', response.statusText)
    }
}

async function castVote(id: number, vote: VoteState): Promise<Quote> {
    const url = new URL(`/quotes/${id}/vote`, api_endpoint)
    const payload = {
        voteState: vote
    }
    const response = await fetch(url.href, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) })
    if (response.ok) {
        return (await response.json()) as Quote
    } else {
        throw new APIError('failed to cast vote', response.statusText)
    }
}

const quotesApi = {
    all,
    add,
    getRandomQuote,
    getMostLikedQuotes,
    getMostRecentQuotes,
    castVote
}

export default quotesApi;

