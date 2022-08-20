import React from 'react'
import AddQuoteModal from './AddQuoteModal'
import ProfileSettingsModal from './ProfileSettingsModal'

type Props = {}

const Modals = (props: Props) => {
    return (
        <>
            <AddQuoteModal />
            <ProfileSettingsModal />
        </>)
}

export default Modals