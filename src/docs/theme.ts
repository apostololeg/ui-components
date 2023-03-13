import { ThemeHelpers, ThemeDefaults } from 'uilib';

const { colors, getColors, getConfig } = ThemeDefaults;

const defaultColors = getColors();
const defaultConfig = getConfig();

export const colorsConfig = {
  light: {
    ...ThemeHelpers.colorsConfigToVars({
      ...getColors({
        accent: colors.dark,
        decent: colors.light,
      }),
      'code-keyword': '#3674bd',
      'code-separator': '#bfbb36',
      'code-value': '#169780',
      'code-comment': '#008000',
    }),
  },
  dark: {
    ...ThemeHelpers.colorsConfigToVars({
      ...getColors({
        accent: colors.light,
        decent: colors.dark,
      }),
      'code-keyword': '#3674bd',
      'code-separator': '#bfbb36',
      'code-value': '#35c5ab',
      'code-comment': '#666',
    }),
  },
};

export function getThemeConfig(theme: 'dark' | 'light', activeColor: string) {
  return {
    ...defaultConfig,
    ...colorsConfig[theme],
    ...ThemeHelpers.colorsConfigToVars({
      active: {
        color: activeColor, // update activeColor
        // @ts-ignore
        mods: defaultColors.active.mods, // save activeColor mods
      },
    }),
  };
}
