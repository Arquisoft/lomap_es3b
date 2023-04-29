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

    render(<Tab {...props}/>);
    const tab = screen.getByText(props.title);
    expect(tab).toBeInTheDocument();
});