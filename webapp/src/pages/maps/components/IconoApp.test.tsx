import React from 'react';
import { render, screen } from '@testing-library/react';
import IconoApp from './IconoApp';
import '@testing-library/jest-dom'

test('Render Icono App', () => {
    render(<IconoApp/>);
    const imagen = screen.getByAltText("Icono");
    expect(imagen).toBeInTheDocument();
});