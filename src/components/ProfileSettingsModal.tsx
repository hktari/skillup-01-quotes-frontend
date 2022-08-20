import React, { useEffect, useState } from 'react'
import { APIError } from '../services/common'
import { useAuth } from './AuthProvider'

const ProfileSettingsModal = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)
    const { user, updateProfile } = useAuth()

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            const [first, last] = user.username.split(' ')
            setFirstName(first ?? '')
            setLastName(last ?? '')
            // todo: implement profile image
            // setProfilePicture(user.userProfileImg)
        }
    }, [user])

    function onSubmit() {
        async function performSubmit() {
            try {
                await updateProfile(email, [firstName, lastName].join(' '), profilePicture)
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
            <div className="modal fade" id="profile-settings-modal" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex={-1} aria-labelledby="profile-settings-modal-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className='modal-header'>
                            <h4 id="profile-settings-modal-label">Profile <em>settings</em></h4>
                            <p className="text-body">
                                Change your profile settings
                            </p>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input placeholder='example@net.com' type="email" className="form-control"
                                        id="email" aria-describedby="emailHelp"
                                        required
                                        onChange={e => setEmail(e.currentTarget.value)}
                                        value={email} />
                                </div>
                                <div className="mb-3 row">
                                    <div className="col col-6">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input placeholder='John' type="text" className="form-control"
                                            id="firstName" aria-describedby="firstName"
                                            required
                                            onChange={e => setFirstName(e.currentTarget.value)}
                                            value={firstName} />
                                    </div>
                                    <div className="col col-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input placeholder='Scott' type="text" className="form-control"
                                            id="lastName" aria-describedby="lastName"
                                            required
                                            onChange={e => setLastName(e.currentTarget.value)}
                                            value={lastName} />
                                    </ div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-xs-12 col-md-6 mb-3 mb-md-0">
                                        <button type='button' className="btn btn-alt-yellow btn-block">Change password</button>
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <button type='button' className="btn btn-positive btn-block">Change Profile Picture</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-positive" formAction='submit' onClick={() => onSubmit()}>Submit</button>
                            <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" id='closeModalProfileSettings' className="btn d-none" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default ProfileSettingsModal