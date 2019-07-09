const baseConfig = require('eslint-config-react-app');
const baseOverrides = Array.isArray(baseConfig.overrides) ? baseConfig.overrides : [baseConfig.overrides];
const baseTsOverride = baseOverrides.find(x => x.files.find(f => f.indexOf('*.ts') > 0));

module.exports = {
  ...baseConfig,
  overrides: [
    {
      ...baseTsOverride,
      rules: {
        ...baseTsOverride.rules,
      },
    }
  ],
  rules: {
    ...baseConfig.rules,
    "jsx-a11y/anchor-is-valid": "off"
  },
};
