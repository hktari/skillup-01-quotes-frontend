
import config from '../config.json'

export const api_endpoint = new URL(config.API_ENDPOINT)

export function getHeaders() {
    const headers = new Map<string, string>()
    headers.set('Content-Type', 'application/json')

    const jwt = localStorage.getItem('token')
    if (jwt) {
        headers.set('Authorization', 'Bearer ' + jwt)
    }
    return Object.fromEntries(headers);
}


export class APIError extends Error {
    errors: string[]
    constructor(...errors: string[]) {
        super(errors.join('\n'))
        this.errors = errors;
    }
}
