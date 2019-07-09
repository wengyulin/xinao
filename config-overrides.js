const {override, fixBabelImports, addLessLoader, useEslintRc} = require('customize-cra');
const theme = require('./theme');

module.exports = override(
  useEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  }),
);
