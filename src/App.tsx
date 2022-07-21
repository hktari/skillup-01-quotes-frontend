import React, { useEffect, useState } from 'react';
import LandingPageNewUser from './components/LandingPageNewUser';
import Header from './components/Header';
import { User } from './services/interface';
import Footer from './components/Footer';
import authApi from './services/authApi';
import LandingPage from './components/LandingPage';

function App() {
  const [user, setUser] = useState<User>({
    id: 1,
    username: "Wade Warren",
    profileImg: {
      thumbnailUrl: "/assets/images/mock/profile-thumbnail2.webp"
    },
    karmaPoints: 154
  })

  return (
    <>
      <div className="page-wrapper">
        <Header user={user} />
        <main>
          {authApi.isLoggedIn() ? <LandingPage user={user} /> : <LandingPageNewUser />}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App