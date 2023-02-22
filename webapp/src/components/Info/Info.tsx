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
            contenido = (
                <>
                    <p>Información</p>
                </>
            );
            break;
        //Contenido si el valor seleccionado es Imágenes
        case TabEnum.Imágenes:
            contenido = (
                <>
                    <p>Imágenes</p>
                </>
            );
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

export default Info;