import React from 'react';
import { render, screen } from '@testing-library/react';
import MinimumDistanceSlider from './MinimumDistanceSlider';
import '@testing-library/jest-dom';

let onChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
test('Render Icono App', () => {
    
    const props = {
      value:10, 
      onChange
    };

    render(<MinimumDistanceSlider {...props}/>);
    const sliderElement = screen.getByText("Distancia(Km):");
    expect(sliderElement).toBeInTheDocument();

});