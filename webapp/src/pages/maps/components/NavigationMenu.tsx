import React from "react";
import IconoApp from "./IconoApp";
import InicioSesion from "./InicioSesion";

function NavigationMenu():JSX.Element{
    return (
        <>
            <div className="navigationmenu">
                <IconoApp/>
                <InicioSesion/>
            </div>
        </>
    );
}

export default NavigationMenu;