import path, {resolve} from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import react from "@vitejs/plugin-react";
import legacy from '@vitejs/plugin-legacy'


const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

module.exports = defineConfig({
  root,
  base: "./",
  resolve: {
    alias: {
      "@": root,
      "@daoism": root,
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      }
    },
    lib: {
      entry: path.resolve(root, "index.tsx"),
      name: getPackageNameCamelCase(),
      formats: ["es", "cjs", "iife"],
      fileName: (format) => fileName[format],
    },
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ],
});
