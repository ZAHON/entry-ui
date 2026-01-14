import { baseConfig, qwikConfig } from '@entry-ui/eslint';

export default [
  ...baseConfig,
  ...qwikConfig,
  {
    files: ['**/*.browser.test.ts'],
    rules: {
      'qwik/use-method-usage': 'off',
    },
  },
];
