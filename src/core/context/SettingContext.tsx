import { ReactNode, createContext, useEffect, useState } from 'react';
import { PaletteMode } from '@mui/material';

import themeConfig from '@/config/themeConfig';
import { Skin, ThemeColor } from '@/core/layouts/types';

export type Settings = {
  skin: Skin;
  mode: PaletteMode;
  themeColor: ThemeColor;
  toastPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};

export type PageSpecificSettings = {
  skin?: Skin;
  mode?: PaletteMode;
  themeColor?: ThemeColor;
  toastPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};
export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

interface SettingsProviderProps {
  children: ReactNode;
  pageSettings?: PageSpecificSettings | void;
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  toastPosition: themeConfig.toastPosition,
  skin: !themeConfig.skin ? 'default' : themeConfig.skin,
};

const staticSettings = {
  toastPosition: initialSettings.toastPosition,
};

const restoreSettings = (): Settings | null => {
  let settings: Settings | null = null;

  try {
    const storedData: string | null = window.localStorage.getItem('settings');

    if (storedData) {
      const parseStoredData = JSON.parse(storedData) as Settings;
      settings = { ...parseStoredData, ...staticSettings };
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

// set settings in localStorage
const storeSettings = (settings: Settings) => {
  const initSettings = Object.assign({}, settings);
  delete initSettings.toastPosition;
  window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children, pageSettings }: SettingsProviderProps) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings({ ...restoredSettings });
    }
    if (pageSettings) {
      setSettings({ ...settings, ...pageSettings });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSettings]);

  const saveSettings = (updatedSettings: Settings) => {
    storeSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
