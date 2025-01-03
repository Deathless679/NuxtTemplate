module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
  ],
  overrides: [
    {
      files: ['*.scss', '**/*.scss', '*.vue', '**/*.vue'],
      rules: {
        'scss/no-global-function-names': null,
      },
    },
  ],
  rules: {
    'number-max-precision': 5,
  },
};
