import React, {useState}  from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Map from "./components/Map";
import Info from "./components/Info";
import './MapsPage.css';


function MapsPage():JSX.Element{

    const [categorias, setCategorias] = useState<string[]>([]);
    const [amigos, setAmigos] = useState<string[]>([]);
    const [minDistance, setMinDistance] = useState<number>(0);
    const [maxDistance, setMaxDistance] = useState<number>(0);

    const handleCategoriaChange = (selectedOption: string[]) => {
        console.log(`Categoría seleccionada: ${selectedOption}`);
        setCategorias(selectedOption);
    };
      
    const handleAmigoChange = (selectedOption: string[]) => {
        console.log(`Amigo seleccionado: ${selectedOption}`);
        setAmigos(selectedOption);
    };
      
    const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
        console.log(`Distancia seleccionada: ${selectedMinDistance} y ${selectedMaxDistance}`);
        setMinDistance(selectedMinDistance);
        setMaxDistance(selectedMaxDistance);
    };

    return (
        <>
            <div className="mapspage">

                {/*Barra de menu de navegación*/}
                <div className="menunavegacion">
                    <NavigationMenu/>
                </div>
                
                {/*Contenido*/}
                <div className="contenido">

                    {/*Contenido menusuperior*/}
                    <div className="left">
                        <Filters 
                        onCategoriaChange={handleCategoriaChange}
                        onAmigoChange={handleAmigoChange}
                        onMinDistanceChange={handleMinDistanceChange}
                        />
                    </div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa">
                            <Map 
                            categorias={categorias}
                            amigos={amigos}
                            minDistance={minDistance}
                            maxDistance={maxDistance}
                            />
                        </div>

                        {/*Información*/}
                        <div className="informacion">
                            <Info/>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}

export default MapsPage;
