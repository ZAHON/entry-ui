module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /**
     * Disable the line length limit for the commit body.
     * This allows for detailed descriptions without triggering validation errors.
     */
    'body-max-line-length': [0, 'always', Infinity],

    /**
     * Enforce the commit subject to always start with a lower-case letter.
     * Example: feat(core): add something (Correct)
     * Example: feat(core): Add something (Incorrect)
     */
    'subject-case': [2, 'always', 'lower-case'],

    /**
     * Prevent the commit subject from ending with a full stop (period).
     * Example: feat(core): add something. (Incorrect)
     */
    'subject-full-stop': [2, 'never', '.'],

    /**
     * Define the allowed scopes for this monorepo.
     * The scope must be one of the directories or logical parts defined below.
     */
    'scope-enum': [
      2,
      'always',
      [
        // Root
        'core',

        // Configuration Packages
        'configs/eslint',
        'configs/prettier',

        // Product Packages
        'packages/qwik',
        'packages/utilities',

        // Development & Demos
        'playgrounds/qwik',
      ],
    ],

    /**
     * Require a scope to be present in every commit message.
     * Prevents commits like: feat: add something
     */
    'scope-empty': [2, 'never'],

    /**
     * Limit the allowed commit types to maintain a clean and predictable history.
     */
    'type-enum': [2, 'always', ['feat', 'chore', 'refactor', 'fix', 'docs']],
  },
};
