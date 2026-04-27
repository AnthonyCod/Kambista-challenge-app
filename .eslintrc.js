module.exports = {
  root: true,
  extends: [
    'expo',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'metro.config.js',
    'babel.config.js',
    'tailwind.config.js',
    '.eslintrc.js',
  ],
};
