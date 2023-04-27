/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';
import '@testing-library/jest-dom'

let onChange: (selectedOption: string[]) => void
test('Render Icono App', () => {
  
    const props = {
      items:["item1","item2"], 
      dropdownTitle:"Items", 
      onChange
    };

    const { getByTestId } = render(<Dropdown {...props}/>);
    const selectElement = getByTestId('select-component');
    expect(selectElement).toBeInTheDocument();

    const nombre = screen.getByText("Prueba");
    expect(nombre).toBeInTheDocument();
});