const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodePolyfillPlugin = require('webpack-node-libs-compat').NodePolyfillPlugin;

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  node: {
    global: true
  },
  resolve: {
    resolve: {
        fallback: {
          https: false
        }
      }
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  // other configuration options here
};
