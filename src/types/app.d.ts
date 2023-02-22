import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { SettingsProvider } from '@/core/context/SettingContext';

declare global {
  namespace App {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Page<P = {}, IP = P> = NextPage<P, IP> & {
      getConfig?: () => ComponentProps<typeof SettingsProvider>;
      getLayout?: (page: React.ReactElement) => React.ReactElement;
    };

    interface Props extends AppProps {
      Component: Page;
    }
  }
}
