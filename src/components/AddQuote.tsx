import React, { useState } from 'react'

interface AddQuoteProps {
    isOpen: boolean
}

const AddQuote = ({ isOpen }: AddQuoteProps) => {
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
                            <textarea name="" id=""></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-positive">Submit</button>
                            <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default AddQuote