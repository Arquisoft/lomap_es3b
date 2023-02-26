import React from 'react';

type Comentario = {
    usuario: String;
    fecha: Date;
    contenido: String;
}

type CommentProps = {
    comentario: Comentario;
}

function Comment(props: CommentProps): JSX.Element {

    return (
        <>
            <div className="comentario">
                <div>
                    <div className="cabecera">
                        <div className="usuario">
                            <p>{props.comentario.usuario}</p>
                        </div>
                        <div className="fecha">
                            <p>{props.comentario.fecha.toDateString()}</p>
                        </div>
                    </div>
                    <div className="contenido">
                        <p>{props.comentario.contenido}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export type { Comentario };
export default Comment;