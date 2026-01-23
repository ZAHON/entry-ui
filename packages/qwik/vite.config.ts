import { defineConfig } from 'vite';
import { qwikVite } from '@qwik.dev/core/optimizer';
import { qwikRouter } from '@qwik.dev/router/vite';
import pkg from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { playwright } from '@vitest/browser-playwright';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { dependencies = {}, peerDependencies = {} } = pkg as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeRegex = (dep: any) => new RegExp(`^${dep}(/.*)?$`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const excludeAll = (obj: any) => Object.keys(obj).map(makeRegex);

export default defineConfig(() => {
  return {
    build: {
      target: 'es2020',
      lib: {
        entry: {
          // main entry point
          index: 'src/index.ts',

          // components
          'components/alert/index': 'src/components/alert/index.ts',
          'components/separator/index': 'src/components/separator/index.ts',

          // hooks
          'hooks/use-boolean/index': 'src/hooks/use-boolean/index.ts',
          'hooks/use-controllable/index': 'src/hooks/use-controllable/index.ts',
          'hooks/use-cycle/index': 'src/hooks/use-cycle/index.ts',

          // utilities
          'utilities/merge-refs/index': 'src/utilities/merge-refs/index.ts',
          'utilities/merge-styles/index': 'src/utilities/merge-styles/index.ts',
        },
        formats: ['es'],
        fileName: (_, entryName) => `${entryName}.qwik.mjs`,
      },
      rollupOptions: {
        external: [/^node:.*/, ...excludeAll(dependencies), ...excludeAll(peerDependencies)],
        output: {
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      },
    },
    test: {
      reporters: ['tree'],
      projects: [
        {
          test: {
            name: 'unit',
            environment: 'jsdom',
            include: ['src/**/*.unit.test.{ts,tsx}'],
          },
          plugins: [tsconfigPaths({ root: '.' })],
        },
        {
          test: {
            name: 'browser',
            testTimeout: 2000,
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }, { browser: 'firefox' }],
            },
            include: ['src/**/*.browser.test.{ts,tsx}'],
          },
          plugins: [qwikVite(), tsconfigPaths({ root: '.' })],
        },
      ],
    },
    plugins: [qwikVite(), qwikRouter(), tsconfigPaths({ root: '.' })],
  };
});
