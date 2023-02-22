import { configureChains, createClient, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()]);

export default createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
