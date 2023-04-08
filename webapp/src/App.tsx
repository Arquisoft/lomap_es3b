
import {SessionProvider} from '@inrupt/solid-ui-react';
import './App.css';
import MapsPage from './pages/maps/MapsPage';

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
