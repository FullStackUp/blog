//it's node.js :

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //name of our entry and where is it
  entry: {
    main: path.join(__dirname, "./src/index.js"),
  },
  //it's the out and where we're going put the transform from babel-loader = bundle
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  //definy a key and rules
  module: {
    rules: [
      {
        //take all files js except node_modules
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
    }),
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    //don't open if the navigator it's not open
    open: false,
    static: path.resolve(__dirname, "./dist"),
    port: 4000,
  },
};
