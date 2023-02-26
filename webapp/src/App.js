import Dropdown from "./Dropdown";
import Slider from "./Slider";
import "./styles.css";
import * as React from "react";

export default function App() {

  const categorias = [
    'Biblioteca',
    'Monumentos',
    'Restaurantes',
  ];

  const amigos = [
    'Eloy',
    'Miguel',
    'Lara',
    'Luis Manuel',
  ];

  return (
    <div className="App">
      <h1>Primera versión menú de filtros</h1>
      <div id="menu">
        <Dropdown items={categorias} dropdownTitle="Categorias" />
        <Dropdown items={amigos} dropdownTitle="Amigos" />
        <Slider />
      </div>
    </div>
  );
}
