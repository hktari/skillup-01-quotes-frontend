import { Quote, QuotesList, VoteState } from "./interface";
import { APIError, api_endpoint, getHeaders } from "./common";
import { EmptyQuotesList } from "../util/util";


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
        const json = await httpResult.json()
        return json as Quote
    } else {
        throw new APIError('failed to get random quote', httpResult.statusText)
    }
}

async function getMostLikedQuotes(startIdx: number = 0, pageSize: number = 10, userId: number | null = null): Promise<QuotesList> {
    let url = new URL(`/quotes/most-liked?startIdx=${startIdx}&pageSize=${pageSize}`, api_endpoint).href
    if (userId !== null) {
        url += `&userId=${userId}`
    }

    console.log('getMostLikedQuotes', url);
    const response = await fetch(url, { method: 'GET' })
    const json = await response.json()
    return json as QuotesList;
}

async function getMostRecentQuotes(startIdx: number = 0, pageSize: number = 10, userId: number | null = null): Promise<QuotesList> {
    let url = new URL(`/quotes/most-recent?startIdx=${startIdx}&pageSize=${pageSize}`, api_endpoint).href
    if (userId !== null) {
        url += `&userId=${userId}`
    }

    console.log('getMostRecentQuotes', url);
    const response = await fetch(url, { method: 'GET' })
    return await response.json();
}

async function getMostUpvotedQuotes(startIdx: number = 0, pageSize: number = 10): Promise<QuotesList> {
    // todo: fix endpoint
    let url = new URL(`/quotes/most-recent?startIdx=${startIdx}&pageSize=${pageSize}`, api_endpoint).href
    const response = await fetch(url, { method: 'GET' })
    return await response.json()

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
    getMostUpvotedQuotes,
    castVote
}

export default quotesApi;

