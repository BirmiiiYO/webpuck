const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    devServer: {
        port: 3001
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./public/index.html"}),
        new CleanWebpackPlugin(),
        new ErrorOverlayPlugin(),
        new BundleAnalyzerPlugin({
           analyzerPort: 8001,
           reportTitle: "Bundle Analyzer"
        }),
        new CompressionPlugin({    
          test: /\.js(\?.*)?$/i,    
          filename: "[path][query]",    
          algorithm: "gzip",    
          deleteOriginalAssets: false,  
        })
    ],
    module: {
        rules: [
          {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
            loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath:"assets/", 
                publicPath: "./src/sssets",
                esModule: false
              }
          },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      "@babel/preset-env",
                      "@babel/preset-react",
                      "@babel/preset-typescript",
                    ],
                  },
                },
              },
        ]
    },
    optimization: {
      minimize: true,
      concatenateModules: true,
      flagIncludedChunks: true,
      mangleWasmImports: true,
      mangleExports: 'size',
      minimizer: [new TerserPlugin()],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
}