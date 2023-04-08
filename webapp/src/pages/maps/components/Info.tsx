import React,{useState} from 'react';
import Tab from './Tab';
import Comment,{Comentario} from './Comment';
import { Place } from '../../../shared/shareddtypes';


type InfoProps = {
    place:Place;
};

enum TabEnum { 
    Información = 0,
    Imágenes = 1,
    Comentarios = 2
}

function Info(props: InfoProps): JSX.Element{

    const initialNum = 2;

    const[tab, setTab] = useState(0);
    const[num, setNum] = useState(initialNum);

    let contenido: JSX.Element = (<></>);
    
    switch(tab){
        //Contenido si el valor seleccionado es Información
        case TabEnum.Información:
            contenido = ContenidoInformacion(props.place);
            break;
        //Contenido si el valor seleccionado es Imágenes
        case TabEnum.Imágenes:
            contenido = ContenidoImagenes();
            break;
        //Contenido si el valor seleccionado es Comentarios
        case TabEnum.Comentarios:
            contenido = ContenidoComentarios(num, setNum);
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
                <div className="menu">
                    <Tab onClick={()=>{setTab(0); setNum(initialNum)}} title="Información"/>
                    <Tab onClick={()=>{setTab(1); setNum(initialNum)}} title="Imágenes"/> 
                    <Tab onClick={()=>{setTab(2); setNum(initialNum)}} title="Comentarios"/>
                </div>
                <div className="content">
                    {contenido}
                </div>
            </div>
        </>
    );
}

function ContenidoInformacion(place:Place):JSX.Element {
    return (
        <>
            <div className="header">
                <p>Información</p>
            </div>
            <div className="body">
                <h3>{place.name}</h3>
                <p><b>Direccion:</b>{place.direction}</p>
                <p><b>Categoría:</b>{place.category}</p>
                <p><b>Latitud:</b>{place.latitude}</p>
                <p><b>Longitud:</b>{place.longitude}</p>
            </div>
        </>
    );
}

function ContenidoImagenes():JSX.Element {
    return (
        <>
            <div className="header">
                <p>Imágenes</p>
            </div>
            <div className="body">
                <img src={"http://placekitten.com/300/300"} alt="Imagen Aleatoria" />
            </div>            
        </>
    );
}

function ContenidoComentarios(num:any, setNum:any):JSX.Element {

    

    let com:Comentario ={
        usuario:"Usuario de prueba",
        fecha:new Date(),
        contenido:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    

    let comentarios = [{key:1,comentario:com}, {key:2,comentario:com},{key:3,comentario:com},{key:4,comentario:com},{key:5,comentario:com}, {key:6,comentario:com}];

    let comentariosAMostrar = comentarios.slice(0,num);

    return (
        <>
            <div className="header">
                <p>Comentarios</p>
            </div>
            <div className="body">
                {comentariosAMostrar.map((item) => (
                    <Comment comentario={item.comentario}/>
                ))}
                <button className="more" onClick={()=>{setNum(num+2)}}>
                    <p>Mas Comentarios</p>
                </button>
            </div>
        </>
    );
}

export default Info;