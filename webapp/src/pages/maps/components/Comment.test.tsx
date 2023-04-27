/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';
import '@testing-library/jest-dom'
import { CommentType } from '../../../shared/shareddtypes';

test('Render Icono App', () => {

    let comentario:CommentType={
        id: '',
        webId: "",
        name: 'Prueba',
        date: new Date(),
        text: 'Contenido de prueba'
    }

    render(<Comment comment={comentario}/>);
    const nombre = screen.getByText("Prueba");
    expect(nombre).toBeInTheDocument();
});