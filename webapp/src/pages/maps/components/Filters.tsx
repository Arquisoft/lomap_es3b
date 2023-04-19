import Dropdown from "./Dropdown";
import MinimumDistanceSlider from "./MinimumDistanceSlider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles.css";
import React, { useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import {Friend} from "../../../shared/shareddtypes";
import { getFriends, getLocations } from  "../components/Friends/FriendsPods";

type Props = {
  onCategoriaChange: (selectedOption: string[]) => void;
  onAmigoChange: (selectedOption: string[]) => void;
  onMinDistanceChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
  onButtonClick: () => void;
}

export default function Filters({onCategoriaChange, onAmigoChange, onMinDistanceChange, onButtonClick}: Props) {

  const categories = [
    'Biblioteca',
    'Monumento',
    'Restaurante',
  ];

  const friendsNames: string[] = [];

  const { session } = useSession();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    handleFriends();
  }, [friends]);

  const handleFriends = async () => {
    if (session.info.webId != undefined && session.info.webId != "") {
      let aux = await getFriends(session.info.webId).then((friendsPromise) => {
        return friendsPromise;
      });
      console.log("Mis amigos: ");
      getLocations(aux);
      aux.forEach(friend => {
        friendsNames.push(friend.name);
      });
      console.log(friendsNames);
      setFriends(aux);
    } else setFriends([]);
  };

  const handleCategoriaChange = (selectedOption: string[]) => {
    onCategoriaChange(selectedOption);
  };

  const handleAmigoChange = (selectedOption: string[]) => {
    onAmigoChange(selectedOption);
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
        <Dropdown items={friendsNames} dropdownTitle="Amigos" onChange={handleAmigoChange} />
        <div className="slider">
          <label>Distancia(Km):</label>
          <MinimumDistanceSlider value={0} onChange={handleMinDistanceChange}/>
        </div>
        <button type="button" onClick={handleButtonClick} className="btn btn-primary">Aplicar filtros</button>
      </div>
    </div>
  );
}
