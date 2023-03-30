module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    'import/no-unresolved': 0,
    'linebreak-style': 0,
    'jsx-a11y/label-has-associated-control': 0,
  },
};
