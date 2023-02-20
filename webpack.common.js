var path = require("path");
const TransformReactJsx = require("@babel/plugin-transform-react-jsx");

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
        {
            test: [/\.jsx?$/, /\.js?$/],
            exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
            options: {presets: ["@babel/preset-env","@babel/preset-react"]}
            }
        }
    ]
  },
  // plugins: ["@babel/plugin-transform-react-jsx"]
    
}