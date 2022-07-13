import React, {useState} from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Test from './components/Test';
import Header from './components/Header';
import { User } from './services/interface';

function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <div className="App">
      <Header user={user}/>
      <main>
        <LandingPage />
      </main>
    </div>
  );
}

export default App