import { defineConfig } from 'tsdown';

export default defineConfig({
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
    'src/dom/add-event-listener-once/index.ts',
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
    'src/style/set-style/index.ts',
    'src/style/set-style-property/index.ts',
    'src/style/visually-hidden-input-style/index.ts',
    'src/style/visually-hidden-style/index.ts',
  ],
  format: 'esm',
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
  sourcemap: true,
  shims: true,
  outDir: 'dist',
});
