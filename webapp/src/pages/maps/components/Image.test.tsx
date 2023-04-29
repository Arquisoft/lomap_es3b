import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './Image';
import { Imagen } from '../../../shared/shareddtypes';
import '@testing-library/jest-dom'

test('Render Icono App', () => {

    let imagen:Imagen = {
        título: "Prueba",
        imagen: "Prueba",
        fecha: new Date()
    }

    render(<Image imagen={imagen}/>);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
});