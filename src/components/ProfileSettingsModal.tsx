import React, { useState } from 'react'
import authApi from '../services/authApi'
import { APIError } from '../services/common'

const ProfileSettingsModal = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        async function performSubmit() {
            try {
                await authApi.updateProfile(email, [firstName, lastName].join(' '), profilePicture)
                document.getElementById('closeModalProfileSettings')?.click()
            } catch (error) {
                if (error instanceof APIError) {
                    const errors: string[] = (error as APIError).errors
                    console.log(errors)
                    window.alert(errors.join('\n'))
                } else {
                    console.error(error)
                    window.alert('action failed.')
                }
            }
        }

        performSubmit();
    }

    return (
        <>
            <div className="modal fade" id="profile-settings" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex={-1} aria-labelledby="profile-settings-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className='modal-header'>
                            <h4 id="profile-settings-label">Profile <em>settings</em></h4>
                            <p className="text-body">
                                Change your profile settings
                            </p>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <textarea placeholder='example@net.com' type="email" className="form-control"
                                        id="email" aria-describedby="emailHelp"
                                        required
                                        onChange={e => setEmail(e.currentTarget.value)}
                                        value={email} />
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-6">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <textarea placeholder='John' type="text" className="form-control"
                                            id="firstName" aria-describedby="firstName"
                                            required
                                            onChange={e => setFirstName(e.currentTarget.value)}
                                            value={firstName} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <textarea placeholder='Scott' type="text" className="form-control"
                                            id="lastName" aria-describedby="lastName"
                                            required
                                            onChange={e => setLastName(e.currentTarget.value)}
                                            value={lastName} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-positive" formAction='submit'>Submit</button>
                            <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" id='closeModalProfileSettings' className="btn d-none" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default ProfileSettingsModal