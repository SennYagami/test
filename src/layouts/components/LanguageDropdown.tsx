import { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Translate from 'mdi-material-ui/Translate';
import { useTranslation } from 'react-i18next';

import { Settings } from '@/core/context/SettingContext';

interface Props {
  settings: Settings;
  saveSettings: (values: Settings) => void;
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  // ** Hook
  const { i18n } = useTranslation();

  useEffect(() => {
    saveSettings(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const handleLangDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleLangItemClick = (lang: 'en' | 'zh') => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        handleLangDropdownClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="customized-menu"
        onClick={handleLangDropdownOpen}
      >
        <Translate />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLangDropdownClose}
        sx={{ '& .MuiMenu-paper': { mt: 4, minWidth: 130 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem
          sx={{ py: 2 }}
          selected={i18n.language === 'en'}
          onClick={() => {
            handleLangItemClick('en');
            saveSettings({ ...settings });
          }}
        >
          English
        </MenuItem>
        <MenuItem
          sx={{ py: 2 }}
          selected={i18n.language === 'zh'}
          onClick={() => {
            handleLangItemClick('zh');
            saveSettings({ ...settings });
          }}
        >
          Chinese
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default LanguageDropdown;
