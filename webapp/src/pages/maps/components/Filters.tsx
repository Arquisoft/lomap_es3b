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
      <div className="header">
        <p>Filtros</p>
      </div>
      <div className="menu">
        <Dropdown items={categorias} dropdownTitle="Categorias" />
        <Dropdown items={amigos} dropdownTitle="Amigos" />
        <MinimumDistanceSlider />
      </div>
    </div>
  );
}
