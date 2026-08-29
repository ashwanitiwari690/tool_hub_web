export interface UnitOption {
  id: string;
  label: string;
  toBase: number; // multiply by this to convert to the category's base unit
}

export interface UnitCategory {
  id: string;
  label: string;
  units: UnitOption[];
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    label: 'Length',
    units: [
      { id: 'mm', label: 'Millimeters', toBase: 0.001 },
      { id: 'cm', label: 'Centimeters', toBase: 0.01 },
      { id: 'm', label: 'Meters', toBase: 1 },
      { id: 'km', label: 'Kilometers', toBase: 1000 },
      { id: 'in', label: 'Inches', toBase: 0.0254 },
      { id: 'ft', label: 'Feet', toBase: 0.3048 },
      { id: 'yd', label: 'Yards', toBase: 0.9144 },
      { id: 'mi', label: 'Miles', toBase: 1609.344 },
    ],
  },
  {
    id: 'weight',
    label: 'Weight',
    units: [
      { id: 'mg', label: 'Milligrams', toBase: 0.001 },
      { id: 'g', label: 'Grams', toBase: 1 },
      { id: 'kg', label: 'Kilograms', toBase: 1000 },
      { id: 'oz', label: 'Ounces', toBase: 28.3495 },
      { id: 'lb', label: 'Pounds', toBase: 453.592 },
      { id: 'tonne', label: 'Metric tons', toBase: 1_000_000 },
    ],
  },
  {
    id: 'speed',
    label: 'Speed',
    units: [
      { id: 'mps', label: 'Meters/second', toBase: 1 },
      { id: 'kph', label: 'Kilometers/hour', toBase: 0.277778 },
      { id: 'mph', label: 'Miles/hour', toBase: 0.44704 },
      { id: 'knot', label: 'Knots', toBase: 0.514444 },
    ],
  },
  {
    id: 'time',
    label: 'Time',
    units: [
      { id: 'sec', label: 'Seconds', toBase: 1 },
      { id: 'min', label: 'Minutes', toBase: 60 },
      { id: 'hour', label: 'Hours', toBase: 3600 },
      { id: 'day', label: 'Days', toBase: 86400 },
      { id: 'week', label: 'Weeks', toBase: 604800 },
    ],
  },
  {
    id: 'data',
    label: 'Data Storage',
    units: [
      { id: 'bit', label: 'Bits', toBase: 0.125 },
      { id: 'byte', label: 'Bytes', toBase: 1 },
      { id: 'kb', label: 'Kilobytes', toBase: 1024 },
      { id: 'mb', label: 'Megabytes', toBase: 1024 ** 2 },
      { id: 'gb', label: 'Gigabytes', toBase: 1024 ** 3 },
      { id: 'tb', label: 'Terabytes', toBase: 1024 ** 4 },
    ],
  },
  {
    id: 'area',
    label: 'Area',
    units: [
      { id: 'sqm', label: 'Square meters', toBase: 1 },
      { id: 'sqkm', label: 'Square kilometers', toBase: 1_000_000 },
      { id: 'sqft', label: 'Square feet', toBase: 0.092903 },
      { id: 'acre', label: 'Acres', toBase: 4046.86 },
      { id: 'hectare', label: 'Hectares', toBase: 10000 },
    ],
  },
  {
    id: 'volume',
    label: 'Volume',
    units: [
      { id: 'ml', label: 'Milliliters', toBase: 0.001 },
      { id: 'l', label: 'Liters', toBase: 1 },
      { id: 'gal', label: 'Gallons (US)', toBase: 3.78541 },
      { id: 'cup', label: 'Cups', toBase: 0.24 },
      { id: 'floz', label: 'Fluid ounces (US)', toBase: 0.0295735 },
    ],
  },
];

export const TEMPERATURE_UNITS: UnitOption[] = [
  { id: 'c', label: 'Celsius', toBase: 1 },
  { id: 'f', label: 'Fahrenheit', toBase: 1 },
  { id: 'k', label: 'Kelvin', toBase: 1 },
];

export function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;
  switch (from) {
    case 'f':
      celsius = ((value - 32) * 5) / 9;
      break;
    case 'k':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  switch (to) {
    case 'f':
      return (celsius * 9) / 5 + 32;
    case 'k':
      return celsius + 273.15;
    default:
      return celsius;
  }
}
