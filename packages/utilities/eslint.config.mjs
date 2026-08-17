import { baseConfig } from '@entry-ui/eslint';

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
    },
  },
];
