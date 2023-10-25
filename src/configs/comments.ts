import { pluginComments } from 'src/plugins';
import type { ConfigItem } from 'src/types';

export function comments(): ConfigItem[] {
  return [
    {
      name: 'sfilata:eslint-comments',
      plugins: {
        'eslint-comments': pluginComments
      },
      rules: {
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error'
      }
    }
  ];
}
