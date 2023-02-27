import React from 'react';
import './App.css';
import Filters from './pages/maps/components/Filters';
import Map from './pages/maps/components/Map';

function App(): JSX.Element {

  return (
    <>
      <Filters/>
      <Map/>
    </>
  );
}

export default App;
