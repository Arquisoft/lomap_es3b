import React from 'react';
import { CommentType } from '../../../shared/shareddtypes';
import moment from 'moment';

type CommentProps = {
    comment: CommentType;
}

function Comment(props: CommentProps): JSX.Element {

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