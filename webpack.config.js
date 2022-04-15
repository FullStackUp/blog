//it's node.js :

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  //name of our entry and where is it
  entry: {
    main: path.join(__dirname, "./src/index.js"),
    form: path.join(__dirname, "./src/form/form.js"),
    topbar: path.join(__dirname, "./src/assets/js/topbar.js"),
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
        //starts from right to left, the order is important
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
      //own bundle
      chunks: ["main", "topbar"],
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.join(__dirname, "./src/form/form.html"),
      chunks: ["form", "topbar"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/img/*",
          to: "assets/img/[name][ext]",
        },
      ],
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
