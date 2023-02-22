/**
 * Config
 * -------------------------------------------------------------------------------------
 * ! IMPORTANT: Make sure you clear the browser local storage in order to see the config changes in the template.
 * ! To clear local storage, you may refer https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/.
 */

// ** MUI Imports
import { PaletteMode } from '@mui/material';

// ** Types
import { Skin } from '@/core/layouts/types';

type ThemeConfig = {
  skin: Skin;
  mode: PaletteMode;
  toastPosition:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  mode: 'light' /* light | dark */,
  skin: 'default' /* default | bordered | semi-dark /*! Note: semi-dark value will only work for Vertical Layout */,
  toastPosition:
    'top-right' /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */,
};

export default themeConfig;
