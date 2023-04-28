import React,{useState} from 'react';
import Tab from './Tab';
import Comment  from './Comment';
import { PlacePOD, CommentType} from '../../../shared/shareddtypes';
import StarRatings from 'react-star-ratings';

type InfoProps = {
    place:PlacePOD;
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
            contenido = ContenidoImagenes(props.place.place.photoLink);
            break;
        //Contenido si el valor seleccionado es Comentarios
        case TabEnum.Comentarios:
            contenido = ContenidoComentarios(num, setNum, props.place.place.comments);
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

function ContenidoInformacion(place:PlacePOD):JSX.Element {
    return (
        <>
            <div className="header">
                <p>Información</p>
                <StarRatings 
                    rating={place.place.rating}
                    starDimension="30px"
                    starSpacing='1px'
                    starRatedColor="orange"
                />
            </div>
            <div className="body">
                <h3>{place.place.name}</h3>
                <p><b>Direccion:</b>{place.place.direction}</p>
                <p><b>Categoría:</b>{place.place.category}</p>
                <p><b>Latitud:</b>{place.place.latitude}</p>
                <p><b>Longitud:</b>{place.place.longitude}</p>
            </div>
        </>
    );
}

function ContenidoImagenes(imgs:string[]):JSX.Element {
    if (imgs.length === 0) {
        return (
          <>
            <div className="header">
              <p>Imágenes</p>
            </div>
            <div className="body">
              <p>No hay imágenes para este lugar</p>
            </div>
          </>
        );
      }
    return (
        <>
            <div className="header">
                <p>Imágenes</p>
            </div>
            <div className="body">
                {imgs.map((item)=><img src={item} alt="Imagen Aleatoria" />)}
                
            </div>            
        </>
    );
}

function ContenidoComentarios(num:any, setNum:any, comments: CommentType[]):JSX.Element {   
    
    if (comments.length == 0) {
        return (
            <>
              <div className="header">
                <p>Imágenes</p>
              </div>
              <div className="body">
                <p>No hay comentarios</p>
              </div>
            </>
          );
    }

    let comentariosAMostrar = comments.slice(0,num);

    return (
        <>
            <div className="header">
                <p>Comentarios</p>
            </div>
            <div className="body">
                {comentariosAMostrar.map((item) => (
                    <Comment comment={item}/>
                ))}
                <button className="more" onClick={()=>{setNum(num+2)}}>
                    <p>Mas Comentarios</p>
                </button>
            </div>
        </>
    );
}

export default Info;