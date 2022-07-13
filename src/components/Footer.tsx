import React from 'react'

type FooterProps = {}

const Footer = (props: FooterProps) => {
    return (
        <footer className="bg-primary">
            <div>
                <i className="bi bi-quote"></i><small>All Rights Reserved | skillupmentorcom</small>
            </div>
        </footer>
    )
}

export default Footer