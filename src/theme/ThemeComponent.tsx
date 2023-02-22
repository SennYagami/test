import { ReactNode } from 'react';
import { deepmerge } from '@mui/utils';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import overrides from './overrides';
import typography from './typography';
import themeOptions from './themeOptions';
import GlobalStyling from './globalStyles';

import { Settings } from '@/core/context/SettingContext';
import UserThemeOptions from '@/layouts/UserThemeOption';
import Direction from '@/layouts/components/Direction';

interface Props {
  settings: Settings;
  children: ReactNode;
}

const ThemeComponent = (props: Props) => {
  // ** Props
  const { settings, children } = props;

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings);

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig);

  // ** Deep Merge Component overrides of core and user
  const mergeComponentOverrides = (mtheme: Theme, msettings: Settings) =>
    deepmerge({ ...overrides(mtheme, msettings) }, UserThemeOptions()?.components);

  // ** Deep Merge Typography of core and user
  const mergeTypography = (mgtheme: Theme) =>
    deepmerge(typography(mgtheme), UserThemeOptions()?.typography);

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...mergeComponentOverrides(theme, settings) },
    typography: { ...mergeTypography(theme) },
  });

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={'ltr'}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme, settings)} />
        {children}
      </Direction>
    </ThemeProvider>
  );
};

export default ThemeComponent;
