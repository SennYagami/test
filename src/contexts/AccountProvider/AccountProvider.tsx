import { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import {
  Credential,
  createCredential,
  generateMessage,
  getLocalCredential,
  isValidCredential,
  setLocalCredential,
} from '../../utils/utils';

import AccountContext from './AccountContext';

import { useLatestCallback } from '@/hooks/useLatestCallback';

interface Props {
  children?: React.ReactNode;
}

export default function AccountProvider(props: Props) {
  const { children } = props;

  const contextValue = useAccountContextValue();

  return <AccountContext.Provider value={contextValue}>{children}</AccountContext.Provider>;
}

function useAccountContextValue(): AccountContext {
  const { address, isConnected: connected, status } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();
  const [credential] = useCredential(address);

  const handleConnect = useLatestCallback(connect);
  const handleDisconnect = useLatestCallback(disconnect);

  return useMemo(
    () => ({
      address,
      connected,
      status,
      credential,
      connect: handleConnect,
      disconnect: handleDisconnect,
    }),
    [address, connected, credential, handleConnect, handleDisconnect, status],
  );
}

function useCredential(address?: string) {
  const [currentCredential, setCurrentCredential] = useState<Credential>();
  const { signMessage } = useSignMessage({
    onSuccess(data, { message }) {
      if (address == null) return;

      const newCredential = createCredential(message as string, data);
      setLocalCredential(address, newCredential);
      setCurrentCredential(newCredential);
    },
  });

  useEffect(() => {
    if (address == null) {
      setCurrentCredential(undefined);
      return;
    }

    const localCredential = getLocalCredential(address);
    if (localCredential != null && isValidCredential(localCredential)) {
      setCurrentCredential(localCredential);
    } else {
      signMessage({ message: generateMessage() });
    }
  }, [address, signMessage]);

  return [currentCredential, setCurrentCredential] as const;
}
