import React from 'react';
import { useState } from 'react';
import { CommentType } from '../../../shared/shareddtypes';
import moment from 'moment'
import { getProfileName } from '../../../pods/Profile';

type CommentProps = {
    comment: CommentType;
}

function Comment(props: CommentProps): JSX.Element {

    let fecha = new Date(props.comment.date);
    console.log(fecha);

    return (
        <>
            <div className="comentario">
                <div>
                    <div className="cabecera">
                        <div className="usuario">
                            <p>{props.comment.name}</p>
                        </div>
                        <div className="fecha">
                            <p>{moment().format("MMM Do YYYY")}</p>
                        </div>
                    </div>
                    <div className="contenido">
                        <p>{props.comment.text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;