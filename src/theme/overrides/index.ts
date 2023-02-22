// ** MUI Imports
import { Theme } from '@mui/material/styles';

import MuiButton from './button';

import { Settings } from '@/core/context/SettingContext';

const Overrides = (theme: Theme, settings: Settings) => {
  const { skin } = settings;
  console.log(skin);

  const button = MuiButton(theme);

  return Object.assign({}, button);
};

export default Overrides;
