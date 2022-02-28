const path = require('path');

module.exports = {
  entry: './frontend/humpday.jsx', 
  output: { 
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: 'bundle.js',
    assetModuleFilename: '../images/[hash][ext][query]'
  },
  module: {
    rules: [
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   type: 'asset/resource',
      // },
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
