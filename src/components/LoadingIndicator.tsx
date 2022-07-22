import React from 'react'

interface LoadingIndicatorProps {
    loading : boolean;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return (
        <div className={props.loading ? 'loading-indicator' : 'd-none'}>
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingIndicator