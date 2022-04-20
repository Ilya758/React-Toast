export const parameters = {
  backgrounds: {
    values: [
      { name: 'dark', value: '#000000' },
      { name: 'light', value: '#ffffff' },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

