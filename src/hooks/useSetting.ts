import { useContext } from 'react';

import { SettingsContext, SettingsContextValue } from '@/core/context/SettingContext';

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
