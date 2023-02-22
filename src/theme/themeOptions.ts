import { deepmerge } from '@mui/utils';
import { ThemeOptions } from '@mui/material';

import palette from './palette';
import spacing from './spacing';
import shadows from './shadows';
import breakpoints from './breakpoints';

import UserThemeOptions from '@/layouts/UserThemeOption';
import { Settings } from '@/core/context/SettingContext';

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars..
  const { skin, mode, themeColor } = settings;

  const userThemeConfig = Object.assign({}, UserThemeOptions());

  const userFontFamily = '';

  // ** Remove component overrides and typography objects from userThemeOptions
  delete userThemeConfig.components;
  delete userThemeConfig.typography;

  const mergedThemeConfig = deepmerge(
    {
      palette: palette(mode, skin, themeColor),
      typography: {
        fontFamily:
          userFontFamily ||
          [
            'Inter',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
      },
      shadows: shadows(mode),
      ...spacing,
      breakpoints: breakpoints(),
      shape: {
        borderRadius: 6,
      },
      mixins: {
        toolbar: {
          minHeight: 64,
        },
      },
    },
    userThemeConfig,
  );

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...mergedThemeConfig.palette[themeColor],
      },
    },
  });
};

export default themeOptions;
