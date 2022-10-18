const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV === "production" ? "production" : "development"
const minimizer = mode === "production" ? [ new TerserPlugin() ] : []

const common = {
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/i, use: ["style-loader", 'css-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
  },
  mode,
  optimization: {
    minimizer
  },
  plugins: [
  ],
}

const index = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist', "js"),
    filename: 'index.js',
    library: "index",
    libraryTarget: "umd"
  },
};

const signup = {
  entry: './src/signup.ts',
  output: {
    path: path.resolve(__dirname, 'dist', "js"),
    filename: 'signup.js',
    library: "signup",
    libraryTarget: "umd"
  },
};

const exp = [index, signup];
exp.forEach((ex) => Object.assign(ex, common))

module.exports = exp;