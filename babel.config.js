module.exports = {
  presets: [['@babel/preset-env', { loose: true }], '@babel/preset-react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from'
  ]
};
