// @ts-check
import config from './dist/index.js';

export default config({
  vue: true,
  typescript: true,
  ignores: [
    'fixtures',
    '_fixtures'
  ]
},
{
  files: ['src/**/*.ts'],
  rules: {
    'sort-keys/sort-keys-fix': 'error'
  }
});
