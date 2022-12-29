module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  env: {
    node: true, //此项指定环境的全局变量，下面的配置指定为node环境
  },
  rules: {
    // allow async-await
    semi: 0,
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false,
      },
    ],
    'vue/no-v-model-argument': 'off',
    'no-undef': 'off',
    camelcase: 'off',
    'no-mixed-spaces-and-tabs': 0,
    'vue/no-mutating-props': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-props': 'off',
    'no-unused-vars': 0,
    'vue/no-useless-template-attributes': 'off',
    'no-irregular-whitespace': 0,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: false,
      },
    },
  ],
}
