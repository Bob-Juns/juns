import { DefaultTheme } from 'styled-components';

const color = {
  purple: '#7f6efb',
  green: '#2bc8d8',
  yellow: '#febb2e',
  gray: '#adb5bd',
};

const breakpoints = {
  tablet: 768,
  desktop: 1024,
};

const device = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) =>
    `@media all and (min-width: ${breakpoints[key]}px) { ${style} }`;
};

export const theme: DefaultTheme = {
  color,
  device,
};
