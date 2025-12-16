// eslint.config.js
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Konfigurasi Global
  {
    ignores: ['dist/', 'node_modules/', 'src/generated/**'],
  },

  // 2. Konfigurasi ESLint Rekomendasi

  ...tseslint.configs.recommended,

  // 3. Konfigurasi untuk file TypeScript
  {
    files: ['src/**/*.ts'], // Terapkan hanya pada file .ts di folder src
    languageOptions: {
      globals: {
        ...globals.node, // Aktifkan global variabel untuk lingkungan Node.js
      },
    },
    rules: {
      // Aturan custom Anda bisa ditambahkan di sini
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // 4. Konfigurasi Prettier (harus di paling akhir)
  // Ini akan menonaktifkan aturan ESLint yang mungkin konflik dengan Prettier
  eslintConfigPrettier,
];
