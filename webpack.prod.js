const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const TerserPlugin = require('terser-webpack-plugin')

const packageJsonPath = path.resolve(__dirname, 'package.json')
const { dependencies } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'https://e-commerce-product-silk.vercel.app/',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'productListing',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductListPage': './src/product-listing-app',
      },
      remotes: {
        container: 'container@http://localhost:8081/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-redux': {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react-redux'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3001,
    hot: false,
    liveReload: true,
  },

  mode: 'production',
}
