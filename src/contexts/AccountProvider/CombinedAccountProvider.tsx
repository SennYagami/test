import { WagmiConfig } from 'wagmi';

import client from './Client';
import AccountProvider from './AccountProvider';

interface Props {
  children?: React.ReactNode;
}

export default function CombinedAccountProvider(props: Props) {
  const { children } = props;

  return (
    <WagmiConfig client={client}>
      <AccountProvider>{children}</AccountProvider>
    </WagmiConfig>
  );
}
