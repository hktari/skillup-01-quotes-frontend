import React, { useState } from 'react'
import { Quote, QuotesList } from '../services/interface'
import QuoteComponent from './QuoteComponent'

interface QuotesListProps {
    loadMoreItems: (curPage: number, pageSize: number) => Promise<QuotesList>
    pageSize: number
}

const QuotesListComponent = ({ loadMoreItems, pageSize = 10 }: QuotesListProps) => {
    const [curPage, setCurPage] = useState(1)
    const [items, setItems] = useState<Quote[]>([])
    const [canLoadMore, setCanLoadMore] = useState(false)

    async function onLoadMoreClicked() {
        const list = await loadMoreItems(curPage, pageSize)

        setItems(list.quotes)
        setCurPage(list.curPageIdx)
        setCanLoadMore(list.curPageIdx * list.pageSize < list.totalQuotes)
    }
    return (
        <div className="quotes-list">
            {items.map(q => <QuoteComponent key={q.id} quote={q} />)}
            
            {/* todo: bind canLoadMore */}
            <button className="btn btn-alt centered btn-wide" onClick={() => onLoadMoreClicked()}>
                load more
            </button>
        </div>
    )
}

export default QuotesListComponent