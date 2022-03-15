import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const config = {
  mode: "development",
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".ts", ".tsx"],
  },
  devtool: "source-map",
  node: {
    // Prevents inserting `new Function("string")`
    // which is forbidden by the CSP header, see
    // https://github.com/webpack/webpack/issues/5627
    global: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        include: path.join(__dirname, "src"),
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig-webpack.json",
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|ttf)$/,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Smallify",
      inject: "head",
      template: "src/assets/index.html",
      hash: true,
      publicPath: "/",
      // favicon: "src/assets/favicon.svg",
    }),
  ],
};

export default config;
