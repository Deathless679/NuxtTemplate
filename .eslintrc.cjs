module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['airbnb-base', '@nuxt', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'arrow-body-style': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'space-before-function-paren': 0,
    'space-in-brackets': ['error', 'always'],
    'max-len': ['error', 120, 2, { ignoreUrls: true }],
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-undef': 'off',
  },
  options: {
    fix: true,
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
};
