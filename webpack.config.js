var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react',]
          }
        }
      }
    ]
  },
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: [".js", ".jsx", "*", ".jpg"]
  }
};
