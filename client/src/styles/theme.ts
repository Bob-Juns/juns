import { DefaultTheme } from 'styled-components';

const color = {
  purple: '#7f6efb',
  green: '#2bc8d8',
  yellow: '#fed75c',
  gray: {
    base: '#adb5bd',
    light: '#f8f9fa',
  },
  red: '#e03131',
  warning: {
    dark: '#cd4b2b',
    light: '#fcebe3',
  },
  category: {
    drama: '#70adee',
    ent: '#f69262',
    movie: '#259961',
    game: '#6d544c',
    etc: '#7f6efb',
  },
};

const boxShadow = {
  primary: '1px 1px 4px rgba(0, 0, 0, 0.25)',
  secondary: '0px 2px 4px rgba(0, 0, 0, 0.25)',
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
  boxShadow,
};
