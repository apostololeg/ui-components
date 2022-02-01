const paths = require('./paths.js');
const rules = require('./rules.js');
const plugins = require('./plugins.js');

const config = {
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.styl'],
    alias: {
      src: paths.src,
      theme: `${paths.src}/theme.styl`,
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'justorm/react': 'justorm/preact',
      hooks: 'preact/hooks',
    },
  },
  module: {
    rules,
  },
  plugins: plugins,
  optimization: {
    moduleIds: 'named',
    minimize: false,
  },
};

module.exports = config;
