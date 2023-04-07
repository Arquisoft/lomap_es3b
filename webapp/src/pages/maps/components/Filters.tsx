import Dropdown from "./Dropdown";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import "../../../styles.css";

type Props = {
  onCategoriaChange: (selectedOption: string[]) => void;
  onAmigoChange: (selectedOption: string[]) => void;
  onMinDistanceChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
}

export default function Filters({onCategoriaChange, onAmigoChange, onMinDistanceChange }: Props) {

  const categories = [
    'Biblioteca',
    'Monumento',
    'Restaurante',
  ];

  const friends = [
    'Eloy',
    'Miguel',
    'Lara',
    'Luis Manuel',
  ];

  const handleCategoriaChange = (selectedOption: string[]) => {
    onCategoriaChange(selectedOption);
  };

  const handleAmigoChange = (selectedOption: string[]) => {
    onAmigoChange(selectedOption);
  };

  const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
    onMinDistanceChange(selectedMinDistance, selectedMaxDistance);
  };

  return (
    <div className="filtros">
      <div className="header">
        <p>Filtros</p>
      </div>
      <div className="menu">
        <Dropdown items={categories} dropdownTitle="Categorias" onChange={handleCategoriaChange}/>
        <Dropdown items={friends} dropdownTitle="Amigos" onChange={handleAmigoChange} />
        <MinimumDistanceSlider value={0} onChange={handleMinDistanceChange}/>
      </div>
    </div>
  );
}
