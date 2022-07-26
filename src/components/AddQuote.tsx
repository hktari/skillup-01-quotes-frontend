import React, { useState } from 'react'

interface AddQuoteProps {
    onSubmit: Function,
    onCancel: VoidFunction
}

const AddQuote = ({ onSubmit, onCancel }: AddQuoteProps) => {
    const [text, setText] = useState('')

    function onSubmitInternal(){
        document.getElementById('closeModal')?.click()          
        onSubmit(text)
        setText('');
    }


    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className='modal-header'>
                            <h4 id="staticBackdropLabel">Are you feeling <em>inspired?</em></h4>
                            <p className="text-body">
                                You can post quotes. You can delete them on your profile.
                            </p>
                        </div>
                        <div className="modal-body">
                            <textarea name="" id="" value={text} onChange={e => setText(e.currentTarget.value)}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-positive" onClick={() => onSubmitInternal()}>Submit</button>
                            <button type="button" className="btn" data-bs-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
                            <button type="button" id='closeModal' className="btn d-none" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default AddQuote