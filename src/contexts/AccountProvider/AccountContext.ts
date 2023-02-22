import { createContext, useContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Credential } from '../../utils/utils';

type AccountProps = Pick<ReturnType<typeof useAccount>, 'address' | 'status'>;
type Connect = ReturnType<typeof useConnect>['connect'];
type Disconnect = ReturnType<typeof useDisconnect>['disconnect'];
interface AccountContext extends AccountProps {
  connected: boolean;
  connect: Connect;
  disconnect: Disconnect;
  credential?: Credential;
}

const AccountContext = createContext<AccountContext | null>(null);

export default AccountContext;

export function useAccountContext() {
  const context = useContext(AccountContext);

  if (context == null) {
    throw new Error(
      'The `AccountContext` is missing in the upper Virtual DOM tree of current Node. ',
    );
  }

  return context;
}
