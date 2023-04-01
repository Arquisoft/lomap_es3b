import { useSession } from '@inrupt/solid-ui-react';
import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Map from "./components/Map";
import Info from "./components/Info";
import './MapsPage.css';
import addMarker from '../../helpers/Markers';
import { MarkerDTO } from '../../shared/shareddtypes';
import Button from 'react-bootstrap/esm/Button';


function MapsPage():JSX.Element{

    const { session } = useSession();
    const { webId } = session.info;
    console.log(webId);

    const marker:MarkerDTO = {
        id:"1",
        name:"prueba",
        latitude: 43,
        longitude:-5.3,
    }

    var blob = new Blob([JSON.stringify(marker)],{type:"aplication/json"})

    var file = new File([blob], "marker.info", {type: blob.type});

    const handleOnClick = async () =>{
        await addMarker(session,file.name,file,webId!);
    }

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

                
                
            
            </div>
        </>
    );
}

export default MapsPage;
