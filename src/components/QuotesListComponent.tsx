import { listenerCount } from 'process'
import React, { useEffect, useState } from 'react'
import { Quote, QuotesList } from '../services/interface'
import QuoteComponent from './QuoteComponent'

interface QuotesListProps {
    loadMoreItems: (startIdx: number, pageSize: number) => Promise<QuotesList>
    pageSize?: number
    needsUpdate?: number
}

const QuotesListComponent = ({ loadMoreItems, pageSize = 10, needsUpdate = 0 }: QuotesListProps) => {
    const [curPage, setCurPage] = useState<number>(1)
    const [items, setItems] = useState<Quote[]>([])
    const [canLoadMore, setCanLoadMore] = useState(true)
    const loadItemsCountDesktop = 9
    const loadItemsCount = 4;

    async function onLoadMoreClicked(page?: number) {
        const list = await loadMoreItems((page ?? curPage - 1) * pageSize, pageSize)

        setItems(items.concat(list.quotes))
        setCurPage(list.startIdx / list.pageSize + 1)
        setCanLoadMore(+list.startIdx + +list.pageSize < +list.totalQuotes)
    }

    // initialize
    useEffect(() => {
        setItems([])
        onLoadMoreClicked()
    }, [needsUpdate])


    function onLoadMoreClickedInternal() {
        onLoadMoreClicked(curPage + 1);
    }

    function RenderQuotes({ count }: { count: number }) {
        return (
            <>
                {items.filter((val, idx) => idx < count).map(q => <QuoteComponent key={q.id} quote={q} />)}
            </>
        )
    }

    return (
        <div className="quotes-list">
            <div className="d-none d-md-flex items-md">
                <RenderQuotes count={curPage * loadItemsCountDesktop} />
            </div>
            <div className="d-md-none items">
                <RenderQuotes count={curPage * loadItemsCount} />
            </div>

            <button hidden={!canLoadMore} className="btn btn-alt centered btn-wide" onClick={() => onLoadMoreClickedInternal()}>
                load more
            </button>
        </div>
    )
}

export default QuotesListComponent