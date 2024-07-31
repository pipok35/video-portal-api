require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [ '@typescript-eslint' ],
  rules: {
    'semi': [ 'error', 'never' ],
    'no-magic-numbers': 'off',
    'no-unused-vars': 'warn',
    'indent': [ 'error', 2 ], // Использовать 2 пробела для отступов
    '@typescript-eslint/indent': [ 'error', 2 ], // Использовать 2 пробела для отступов в TypeScript
    'comma-dangle': [ 'error', 'never' ], // Запретить запятые после последнего элемента
    'array-bracket-spacing': [ 'error', 'always' ], // Обеспечить пробел внутри массивов
    'object-curly-spacing': [ 'error', 'always' ] // Обеспечить пробел внутри объектов
  }
}
