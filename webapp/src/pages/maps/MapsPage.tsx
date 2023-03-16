import { useSession } from '@inrupt/solid-ui-react';
import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Map from "./components/Map";
import Info from "./components/Info";
import './MapsPage.css';


function MapsPage():JSX.Element{

    const { session } = useSession();

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

                {session.info.isLoggedIn ? 
                    <p>{session.info.sessionId}</p>:
                    <p>No logueado</p>
                }
            </div>
        </>
    );
}

export default MapsPage;
