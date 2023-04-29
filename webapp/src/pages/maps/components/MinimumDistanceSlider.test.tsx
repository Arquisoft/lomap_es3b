/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import MinimumDistanceSlider from './MinimumDistanceSlider';
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react';

let onChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
test('Render Icono App', () => {
    
    const props = {
      value:10, 
      onChange
    };

    const { getByRole }=render(<MinimumDistanceSlider {...props}/>);
    const sliderElement = getByRole('slider');
    expect(sliderElement).toBeInTheDocument();

});