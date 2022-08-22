import { QuotesList } from "../services/interface";

export function EmptyQuotesList(): QuotesList {
    return {
        startIdx: 0,
        pageSize: 0,
        totalQuotes: 0,
        quotes: []
    }
}
