import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Map from "./components/Map";
import Info from "./components/Info";
import './MapsPage.css';


function MapsPage():JSX.Element{

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
                    <div className="menusup">
                        <Filters/>
                    </div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa">
                            <Map/>
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
