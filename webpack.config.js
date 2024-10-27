const path = require('path');

module.exports = {
  entry: './src/index.js',  // Path to your entry file
  output: {
    filename: 'aframe-virtual-joystick.js',  // Output file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
    library: 'AframeVirtualJoystick',  // Global variable name for your library
    libraryTarget: 'umd',  // Universal Module Definition
    umdNamedDefine: true,  // Named UMD modules
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Process JavaScript files
        exclude: /node_modules/,  // Exclude node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // Use Babel preset for ES6+
          },
        },
      },
    ],
  },
  mode: 'production',  // Set the mode to production (can also be 'development')
};
