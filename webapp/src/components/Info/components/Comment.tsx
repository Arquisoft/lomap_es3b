import React from 'react';

type Comentario = {
    usuario: String;
    fecha: Date;
    contenido: String;
}

type CommentProps = {
    comentario:Comentario;
}

function Comment(props: CommentProps):JSX.Element{
    return (
        <>
            <div className="comentario">
                <div className="cabecera">
                    <div className="usuario"></div>
                    <div className="fecha"></div>
                </div>
                <div className="contenido">
                    <p></p>
                </div>
            </div>
        </>
    );
}

export default Comment;