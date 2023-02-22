import { useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { useAccountContext } from '@/contexts/AccountProvider/AccountContext';

export default function SignIn() {
  const { address, connected, disconnect, credential } = useAccountContext();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div>
      <h1>Sign In</h1>
      <p>
        Address: <span>{address}</span>
      </p>
      <p>
        Connected: <span>{String(connected)}</span>
      </p>
      <p>
        Signature: <span>{credential?.signature}</span>
      </p>
      {!connected ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <button onClick={() => disconnect()}>Disconnect</button>
      )}
    </div>
  );
}
