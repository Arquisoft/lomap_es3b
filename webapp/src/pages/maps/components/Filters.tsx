import Dropdown from "./Dropdown";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles.css";
import { Friend, MapType } from "../../../shared/shareddtypes";
import { getProfileName } from "../../../pods/Profile";

type Props = {
  mapas:MapType[];
  friends:Friend[];
  onCategoriaChange: (selectedOption: string[]) => void;
  onAmigoChange: (selectedOption: string[]) => void;
  onMapaChange: (selectedOption:string[])=> void;
  onMinDistanceChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
  onButtonClick: () => void;
}

export default function Filters({mapas, friends ,onCategoriaChange, onAmigoChange, onMapaChange, onMinDistanceChange, onButtonClick}: Props) {

  const categories = [
    'Biblioteca',
    'Monumento',
    'Restaurante',
  ];

  const handleCategoriaChange = (selectedOption: string[]) => {
    onCategoriaChange(selectedOption);
  };

  const handleAmigoChange = (selectedOption: string[]) => {
    onAmigoChange(selectedOption);
  };

  const handleMapaChange = (selectedOption: string[]) => {
    onMapaChange(selectedOption);
  };

  const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
    onMinDistanceChange(selectedMinDistance, selectedMaxDistance);
  };

  const handleButtonClick = () => {
    onButtonClick();
  };

  return (
    <div className="filtros">
      <div className="header">
        <p>Filtros</p>
      </div>
      <div className="menu">
        <Dropdown items={categories} dropdownTitle="Categorias" onChange={handleCategoriaChange}/>        
        <Dropdown items={friends.map((friend)=>friend.name)} dropdownTitle="Amigos" onChange={handleAmigoChange} />
        <Dropdown items={mapas.map((mapa)=>mapa.id + "-" + mapa.ownerName)} dropdownTitle="Mapas" onChange={handleMapaChange} />
        <div className="slider">
          <MinimumDistanceSlider value={0} onChange={handleMinDistanceChange}/>
        </div>
        <button type="button" onClick={handleButtonClick} className="btn btn-primary">Aplicar filtros</button>
      </div>
    </div>
  );
}
