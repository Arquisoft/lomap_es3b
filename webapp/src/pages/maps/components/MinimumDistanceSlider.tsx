import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// Valor mínimo de distancia entre los dos puntos del slider
const minDistance = 10;

// Props de la clase MinimumDistanceSlider
type MinimumDistanceSliderProps = {
  value: number;
  onChange: (selectedMinDistance: number, selectedMaxDistance: number) => void;
};

// Componente de React para el slider
export default function MinimumDistanceSlider(props:MinimumDistanceSliderProps) {

  // Estado interno del componente para guardar el valor del slider
  const [value2, setValue2] = React.useState([0, 30]);

  // Función que se ejecuta cada vez que cambia el valor del slider
  const handleChange2 = (event:any, newValue:number|number[], activeThumb:any) => {

    // Si el valor nuevo no es un array, no hacer nada
    if (!Array.isArray(newValue)) {
      return;
    }
    
    // Si la distancia entre los dos puntos del slider es menor que minDistance
    if (newValue[1] - newValue[0] < minDistance) {

      // Si el pulgar activo es el primero (izquierdo)
      if (activeThumb === 0) {

         // Calcular el valor mínimo que puede tomar el primer pulgar
        const clamped = Math.min(newValue[0], 100 - minDistance);

        // Establecer los valores del slider para que la distancia sea igual a minDistance
        setValue2([clamped, clamped + minDistance]);

      } else {// Si el pulgar activo es el segundo (derecho)

        // Calcular el valor máximo que puede tomar el segundo pulgar
        const clamped = Math.max(newValue[1], minDistance);

        // Establecer los valores del slider para que la distancia sea igual a minDistance
        setValue2([clamped - minDistance, clamped]);
      }

    } else {// Si la distancia entre los dos puntos del slider es mayor o igual que minDistance

      // Establecer el nuevo valor del slider
      setValue2(newValue);
    }

    // Llamamos a la función onChange del componente Filters y le pasamos el valor del primer punto del slider
    props.onChange(newValue[0], newValue[1]);
  };

  // Renderizar el slider
  return (
    <Box sx={{ width: 300, paddingTop: 3 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={50}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
        value={value2}
        onChange={handleChange2}
        disableSwap
      />
    </Box>
  );
}
