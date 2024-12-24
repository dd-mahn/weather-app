export const convertToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * (5 / 9);
};

export const convertToFahrenheit = (celsius: number): number => {
  return celsius * (9 / 5) + 32;
};