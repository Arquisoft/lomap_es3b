import React from 'react';
import './Info.css';
import Tab from './components/Tab';

type InfoProps = {
    seleccionado: TabEnum;
};

enum TabEnum { 
    Información = 0,
    Imágenes = 1,
    Comentarios = 2
}

function Info(props: InfoProps): JSX.Element{

    let contenido: JSX.Element = (<></>);
    
    switch(props.seleccionado){
        //Contenido si el valor seleccionado es Información
        case TabEnum.Información:
            contenido = ContenidoInformacion();
            break;
        //Contenido si el valor seleccionado es Imágenes
        case TabEnum.Imágenes:
            contenido = ContenidoImagenes();
            break;
        //Contenido si el valor seleccionado es Comentarios
        case TabEnum.Comentarios:
            contenido = (
                <>
                    <p>Comentarios</p>
                </>
            );
            break;
        //Contenido por defecto
        default:
            contenido = (
                <>
                    <p>Contenido por defecto</p>
                </>
            );
            break;
    }


    return (
        <>
            <div className="info">
                <div className="infomenu">
                    <Tab title="Información"/>
                    <Tab title="Imágenes"/> 
                    <Tab title="Comentarios"/>
                </div>
                <div className="infocontent">
                    {contenido}

                </div>
            </div>
        </>
    );
}

function ContenidoInformacion():JSX.Element {
    return (
        <>
            <h2>Descripción</h2>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </>
    );
}

function ContenidoImagenes():JSX.Element {
    return (
        <>
            <h2>Imágenes</h2>
            <img src={"http://placekitten.com/300/300"} alt="Imagen Aleatoria" />
        </>
    );
}

export default Info;