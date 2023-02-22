import { ReactNode } from 'react';

export type Skin = 'default' | 'bordered' | 'semi-dark';

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type BlankLayoutProps = {
  children: ReactNode;
};

export type BlankLayoutWithAppBarProps = {
  children: ReactNode;
};
