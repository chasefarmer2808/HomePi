import React from "react";

export interface Color {
  r: boolean;
  g: boolean;
  b: boolean;
}

interface ColorPickerProps {
  onSelect: (color: Color) => void;
}

interface ColorMap {
  [key: string]: Color;
}

const colorData: ColorMap = {
  red: {
    r: true,
    g: false,
    b: false,
  },
  green: {
    r: false,
    g: true,
    b: false,
  },
  blue: {
    r: false,
    g: false,
    b: true,
  },
  yellow: {
    r: true,
    g: true,
    b: false,
  },
  cyan: {
    r: false,
    g: true,
    b: true,
  },
  magenta: {
    r: true,
    g: false,
    b: true,
  }
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ onSelect }) => {
  return (
    <div className='color-grid'>
      {Object.keys(colorData).map((color) => (
        <button
          key={color}
          className='color-btn'
          style={{ backgroundColor: color }}
          onClick={() => onSelect(colorData[color])}
        ></button>
      ))}
    </div>
  );
};
