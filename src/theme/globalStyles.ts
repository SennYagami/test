// ** MUI Imports
import { Theme } from '@mui/material/styles';

// ** Type Imports
import { Settings } from '@/core/context/SettingContext';

const GlobalStyles = (theme: Theme, settings: Settings) => {
  // ** Vars
  const { skin } = settings;

  const getBgColor = () => {
    if (skin === 'semi-dark' && theme.palette.mode === 'light') {
      return '#504B6D !important';
    } else if (skin === 'semi-dark' && theme.palette.mode === 'dark') {
      return '#C2C4D1 !important';
    } else if (theme.palette.mode === 'light') {
      return '#C2C4D1 !important';
    } else {
      return '#504B6D !important';
    }
  };

  return {
    body: {
      backgroundColor: getBgColor(),
    },
  };
};

export default GlobalStyles;
