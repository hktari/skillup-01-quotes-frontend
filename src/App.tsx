import React, { useState } from 'react';
import './App.css';
import LandingPageNewUser from './components/LandingPageNewUser';
import Header from './components/Header';
import { User } from './services/interface';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <>
      <div className="page-wrapper">
        <Header user={user} />
        <main>
          <LandingPageNewUser/>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App