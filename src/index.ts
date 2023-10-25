import process from 'node:process';
import fs from 'node:fs';
import { isPackageExists } from 'local-pkg';
import gitignore from 'eslint-config-flat-gitignore';
import { comments, ignores, javascript, jsdoc, node, sortKeys, stylistic, typescript, unicorn, vue } from './configs';
import { imports } from './configs/imports';
import type { ConfigItem, OptionsConfig } from './types';
import { combine } from './utils';

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli'
];

export default function initConfig(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
  const {
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
    typescript: enableTypeScript = isPackageExists('typescript'),
    gitignore: enableGitignore = true,
    overrides = {},
    componentExts = []
  } = options;
  const configs: ConfigItem[][] = [];

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {};
  if (stylisticOptions && !('jsx' in stylisticOptions)) {
    stylisticOptions.jsx = options.jsx ?? true;
  }

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push([gitignore(enableGitignore)]);
    } else if (fs.existsSync('.gitignore')) {
      configs.push([gitignore()]);
    }
  }

  configs.push(
    ignores(),
    javascript({
      isInEditor,
      overrides: overrides.javascript
    }),
    comments(),
    node(),
    jsdoc({
      stylistic: stylisticOptions
    }),
    imports({
      stylistic: stylisticOptions
    }),
    unicorn(),
    sortKeys()
  );

  if (enableVue) {
    componentExts.push('vue');
  }

  if (enableTypeScript) {
    configs.push(typescript({
      ...typeof enableTypeScript !== 'boolean'
        ? enableTypeScript
        : {},
      componentExts,
      overrides: overrides.typescript
    }));
  }

  if (enableVue) {
    configs.push(vue({
      overrides: overrides.vue,
      stylistic: stylisticOptions,
      typescript: !!enableTypeScript
    }));
  }

  if (stylisticOptions) {
    configs.push(stylistic(stylisticOptions));
  }

  const merged = combine(
    ...configs,
    ...userConfigs
  );

  return merged;
}
