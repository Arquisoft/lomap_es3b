import { SessionProvider } from "@inrupt/solid-ui-react";
import React from 'react';
import './App.css';
import LoginPage from './pages/maps/components/loginForm/LoginPage';
import MapsPage from './pages/maps/MapsPage';
import { Route } from 'wouter';

function App(): JSX.Element {

  return (
    <SessionProvider
      sessionId="login"
      restorePreviousSession
    >
      <Route path="/map" component={MapsPage} />
      <Route path="/login" component={LoginPage} />
    </SessionProvider>
  )
}

export default App;
