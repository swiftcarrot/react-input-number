module.exports = {
  mode: 'development',
  entry: './example/app.js',
  output: {
    path: __dirname + '/example',
    filename: 'bundle.js',
    publicPath: '/example/'
  },
  module: {
    rules: [{ test: /\.m?js$/, exclude: /node_modules/, use: 'babel-loader' }]
  },
  devtool: 'source-map'
};
