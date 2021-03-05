import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import json from "@rollup/plugin-json";

const watch = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    resolve({
      browser: true,
    }),
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    commonjs(),
    watch && serve("dist"),
    watch && livereload(),
    json(),
  ],
  watch: {
    clearScreen: false,
  },
};
