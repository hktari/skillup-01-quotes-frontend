import React from 'react'

export interface QuotesContextType {
    quoteCount: number,
    setQuoteCount: (count: number) => void
}

var QuotesContext = React.createContext<QuotesContextType>({ quoteCount: 0, setQuoteCount: null! });

function QuotesProvider({ children }: { children: React.ReactNode }) {
    let [quoteCount, setQuoteCount] = React.useState<number>(0);
    const value = {
        quoteCount,
        setQuoteCount
    }
    return <QuotesContext.Provider value={value}>{children}</QuotesContext.Provider>;
}


export function useQuotes() {
    return React.useContext(QuotesContext);
}

export default QuotesProvider