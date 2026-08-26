import { defineConfig } from 'tsdown';

export default defineConfig({
  // Entry points configuration defining build targets.
  // Specifies both main package entry and individual utility modules for granular exports.
  entry: [
    // main entry point
    'src/index.ts',

    // array
    'src/array/wrap-array/index.ts',

    // common
    'src/common/error/index.ts',
    'src/common/fail/index.ts',
    'src/common/warn/index.ts',

    // dom
    'src/dom/add-event-listener/index.ts',
    'src/dom/copy-to-clipboard/index.ts',
    'src/dom/focus-element/index.ts',
    'src/dom/focus-first-element/index.ts',
    'src/dom/get-active-element/index.ts',
    'src/dom/get-document/index.ts',
    'src/dom/get-window/index.ts',
    'src/dom/has-window/index.ts',
    'src/dom/is-html-element/index.ts',
    'src/dom/is-overflow-element/index.ts',
    'src/dom/is-selectable-input/index.ts',

    // number
    'src/number/clamp/index.ts',
    'src/number/is-number/index.ts',

    // object
    'src/object/is-shallow-subset/index.ts',

    // platform
    'src/platform/get-platform/index.ts',
    'src/platform/get-user-agent/index.ts',
    'src/platform/is-ios/index.ts',
    'src/platform/is-test-environment-dom/index.ts',
    'src/platform/is-webkit/index.ts',

    // scheduling
    'src/scheduling/create-animation-frame/index.ts',
    'src/scheduling/create-timeout/index.ts',
    'src/scheduling/reset-animation-frame-scheduler/index.ts',
    'src/scheduling/wait/index.ts',

    // scroll-lock
    'src/scroll-lock/get-scroll-locker/index.ts',

    // style
    'src/style/get-computed-style/index.ts',
    'src/style/get-css-dimensions/index.ts',
    'src/style/get-hidden-element-height/index.ts',
    'src/style/merge-styles/index.ts',
    'src/style/set-style-property/index.ts',
    'src/style/visually-hidden-input-style/index.ts',
    'src/style/visually-hidden-style/index.ts',
  ],

  // Specifies the output module format for the bundle.
  // Enforces ECMAScript module standard for modern bundlers and runtime import statements.
  format: 'esm',

  // Defines the target deployment environment for the compiled code.
  // Prevents environment-specific assumptions to generate runtime-agnostic code artifacts.
  platform: 'neutral',

  // Sets the target directory path for compiled build artifacts.
  // Stores all generated bundle files, declaration files, and sourcemaps in a single location.
  outDir: 'dist',

  // Controls the automatic generation of TypeScript type definition files.
  // Produces strongly-typed `.d.ts` declaration files alongside bundled JavaScript assets.
  dts: true,

  // Enables external source map generation for step-through debugging.
  // Maps original TypeScript source files to production bundles for simplified stack traces.
  sourcemap: true,

  // Clears the output directory before executing a new build run.
  // Ensures stale artifacts from previous builds are purged to prevent release pollution.
  clean: true,

  // Applies code compression and variable renaming algorithms.
  // Reduces overall bundle size by stripping whitespace, comments, and unused identifiers.
  treeshake: true,

  // Removes unused exports and unreachable code branches.
  // Performs static code analysis to eliminate dead code and minimize final bundle weight.
  minify: true,

  // Injects compatibility polyfills for environment-specific globals.
  // Guarantees consistent availability of core features across browser and Node runtimes.
  shims: true,
});
