import { useSession } from '@inrupt/solid-ui-react';
import React from 'react';
import './App.css';
import LoginPage from './pages/maps/components/loginForm/LoginPage';
import MapsPage from './pages/maps/MapsPage';

function App(): JSX.Element {

  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return (
      <>
        <MapsPage />
      </>
    );
    } else {
      return (
        <>
          <LoginPage />
        </>
      );
   }

}

export default App;
