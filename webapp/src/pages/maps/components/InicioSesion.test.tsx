/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import InicioSesion from './InicioSesion';

test('Render Icono App', () => {
    render(<InicioSesion />);
    const boton = screen.getByText("Log In");
    expect(boton).toBeInTheDocument();
});