/*
	config for build umd module to use
* */
process.env.NODE_ENV = "production";
const path = require("path");
const base = require("./webpack.base");
const merge = require("webpack-merge");
const root = (p) => path.join(__dirname, "..", p);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Uglify = require("uglifyjs-webpack-plugin");
module.exports = (args) => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ];

  if (args === "report") {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return merge(base, {
    mode: "production",
    entry: {
      "paging-picker": root("src/package/main.tsx"),
    },
    output: {
      path: path.resolve(__dirname, "../lib"),
      filename: "[name].js",
      publicPath: "/",
      library: "pickItem",
      // library: 'showShipping',
      libraryTarget: "umd",
      libraryExport: "default", // 需要暴露的模块
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /(\.less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            { loader: "postcss-loader" },
            { loader: "less-loader" },
          ],
        },
      ],
    },
    performance: false,
    optimization: {
      minimize: true,
      minimizer: [
        new Uglify({
          uglifyOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    plugins,
  });
};
