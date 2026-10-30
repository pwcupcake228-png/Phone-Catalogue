module.exports = {
  extends: '@mate-academy/stylelint-config',
  rules: {},
  overrides: [
    {
      files: ['src/index.css'],
      rules: {
        'scss/at-rule-no-unknown': [
          true,
          { ignoreAtRules: ['custom-variant', 'theme'] },
        ],
        'scss/operator-no-unspaced': null,
      },
    },
  ],
};
