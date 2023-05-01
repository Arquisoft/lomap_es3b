import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import Filters from './Filters';
import '@testing-library/jest-dom'
import { MapType, Friend } from '../../../shared/shareddtypes';

let onButtonClick: () => void;
let onCategoriaChange: (selectedOption: string[]) => void;
let onAmigoChange: (selectedOption: string[]) => void;
let onMapaChange: (selectedOption:string[])=> void;
let onMinDistanceChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;

test('Render Icono App', () => {

    let map:MapType = {
        id: "MapaPrueba",
        owner: "",
        map: [],
        ownerName: ""
    }

    let friend:Friend = {
        name : "AmigoPrueba",
        webId : "",
    }

    let props = {
        mapas:[map],
        friends:[friend],
        onCategoriaChange,
        onAmigoChange,
        onMapaChange,
        onMinDistanceChange,
        onButtonClick
    }

    render(<Filters {...props}/>);
    var labelCategorias = screen.getByLabelText('Amigos')
    expect(labelCategorias).toBeInTheDocument();

    /*
    const dropdownAmigos = screen.getByLabelText('Amigos');
    fireEvent.click(dropdownButton);
    let option1 = screen.getByText('MapaPrueba');
    expect(option1).toBeInTheDocument();

    const dropdownAmigo = screen.getByRole('Amigos');
    fireEvent.click(dropdownAmigo);
    option1 = screen.getByText('AmigoPrueba');
    expect(option1).toBeInTheDocument();
    */
});