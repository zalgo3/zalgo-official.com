import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default tseslint.config(
    {
        files: ['*.ts', '*.tsx'],
    },
    {
        ignores: ['**/.next/**/*'],
    },
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    ...compat.extends('next/core-web-vitals'),
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal'],
                    alphabetize: {order: 'asc', caseInsensitive: true},
                    'newlines-between': 'always',
                    pathGroups: [
                        {
                            pattern: 'src/components/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: 'src/lib/**',
                            group: 'internal',
                            position: 'before',
                        },
                    ],
                },
            ],
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
        },
    },
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            'unused-imports/no-unused-imports': 'error',
        },
    },
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
        },
        languageOptions: {
            globals: {
                React: 'readonly',
            },
        },
        rules: {
            'react/jsx-boolean-value': 'error',
            'react/jsx-curly-brace-presence': 'error',
        },
    },
    eslintConfigPrettier
);
