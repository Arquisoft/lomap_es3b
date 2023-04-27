/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Tab from './Tab';
import '@testing-library/jest-dom'

let onClick:()=>void;
test('Render Icono App', () => {

    let props = {
        title:"Prueba",
        selected:false,
        onClick
    }

    const { getByRole } = render(<Tab {...props}/>);
    const tab = getByRole('tab');
    expect(tab).toBeInTheDocument();
});