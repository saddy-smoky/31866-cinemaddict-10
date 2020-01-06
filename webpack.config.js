const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,
  plugins: [
    // Оставляем только одну локаль.
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    port: 9001
  },
};
