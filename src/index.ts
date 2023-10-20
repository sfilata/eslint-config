import { ignores, javascript, stylistic, typescript, vue } from './configs';
import type { ConfigItem, OptionsConfig } from './types';
import { combine } from './utils';
import { isPackageExists } from 'local-pkg';

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

  configs.push(
    ignores(),
    javascript({
      isInEditor,
      overrides: overrides.javascript
    })
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
