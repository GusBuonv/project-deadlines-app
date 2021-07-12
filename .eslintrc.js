module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'object-curly-newline': ['error', { ImportDeclaration: 'never' }],
    '@next/next/no-img-element': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
