import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts", "src/index.css"],
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    treeshake: false,
    esbuildOptions(options) {
      options.conditions = ["style"];
    },
    banner: {
      js: '"use client";',
    },
  },
  {
    entry: {
      utils: "src/lib/utils.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
  },
]);
