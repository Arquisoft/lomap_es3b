
import {SessionProvider} from '@inrupt/solid-ui-react';
import MapsPage from './pages/maps/MapsPage';

import './App.css';

function App(): JSX.Element {

  return (
    <SessionProvider sessionId="login-prueba" restorePreviousSession={true}>
      <>
        <MapsPage />
      </>
    </SessionProvider>
  );
}

export default App;
