import React, { useEffect, useState } from 'react';
import LandingPageNewUser from './components/LandingPageNewUser';
import Header from './components/Header';
import { User } from './services/interface';
import Footer from './components/Footer';
import authApi from './services/authApi';
import LandingPage from './components/LandingPage';

function App() {
  // const tmp_user = {
  //   id: 1,
  //   username: "Wade Warren",
  //   profileImg: {
  //     thumbnailUrl: "/assets/images/mock/profile-thumbnail2.webp"
  //   },
  //   karmaPoints: 154
  // };
  const tmp_user : User | null = null;

  const [user, setUser] = useState<User | null>(tmp_user)

  return (
    <>
      <div className="page-wrapper">
        <Header user={user} />
        <main>
          {authApi.isLoggedIn() ? <LandingPage user={user as User} /> : <LandingPageNewUser />}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App