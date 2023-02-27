import Dropdown from "./Dropdown";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import "../../../styles.css";
import * as React from "react";

export default function Filters() {

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
    <div className="filtros">
      <h1>Primera versión menú de filtros</h1>
      <div id="menu">
        <Dropdown items={categorias} dropdownTitle="Categorias" />
        <Dropdown items={amigos} dropdownTitle="Amigos" />
        <MinimumDistanceSlider />
      </div>
    </div>
  );
}
