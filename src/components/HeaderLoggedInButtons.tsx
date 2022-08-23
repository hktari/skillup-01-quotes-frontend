import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import profilePlaceholder from '../assets/images/profilePlaceholder.webp'

type Props = {}


const HeaderLoggedInButtons = (props: Props) => {
  const navigate = useNavigate()
  const auth = useAuth()

  async function onLogout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    try {
      await auth.logout()
      navigate('/login')
    } catch (error) {
      console.error(error)
      window.alert('An error occured')
    }
  }

  function OnProfileIconClicked() {
    navigate(`/userProfile/${auth.user?.id}`, {
      state: auth.user
    })
  }

  return (
    <>
      <Link to='/dashboard'>Home</Link>
      <Link to='/settings'>Settings</Link>
      <Link to='/dashboard' onClick={onLogout}>Logout</Link>

      <img className='profile-icon' src={auth.user?.userProfileImg ?? profilePlaceholder} alt="profile icon" onClick={OnProfileIconClicked} />
    </>
  )
}

export default HeaderLoggedInButtons