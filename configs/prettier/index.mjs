const getPlugins = () => {
  const plugins = [];

  try {
    require.resolve('prettier-plugin-astro');
    plugins.push('prettier-plugin-astro');
  } catch {}

  try {
    require.resolve('prettier-plugin-tailwindcss');
    plugins.push('prettier-plugin-tailwindcss');
  } catch {}

  return plugins;
};

export const config = {
  printWidth: 120,
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  tailwindFunctions: ['cva'],
  plugins: getPlugins(),
  overrides: [
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
