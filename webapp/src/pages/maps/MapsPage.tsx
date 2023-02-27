import React from "react";

function MapsPage():JSX.Element{

    return (
        <>
            <div className="mapspage">

                {/*Barra de menu de navegación*/}
                <div className="menunavegacion"></div>
                
                {/*Contenido*/}
                <div className="contenido">

                    {/*Contenido lateral izquierdo*/}
                    <div className="lateralizq"></div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa"></div>

                        {/*Información*/}
                        <div className="informacion">
                            
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}

export default MapsPage;
