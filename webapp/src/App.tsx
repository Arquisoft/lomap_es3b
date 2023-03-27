import {SessionProvider, useSession } from '@inrupt/solid-ui-react';
import React from 'react';
import './App.css';
import MapsPage from './pages/maps/MapsPage';

function App(): JSX.Element {

  const { session } = useSession();

  return (
    <SessionProvider sessionId="login-prueba" restorePreviousSession={false}>
      <>
        <MapsPage />
      </>
    </SessionProvider>
  );
}

export default App;
