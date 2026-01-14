import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/index.ts"],
  format: "esm",
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: true,
  sourcemap: true,
  shims: true,
  outDir: "dist",
  external: ["style-to-object"],
});
