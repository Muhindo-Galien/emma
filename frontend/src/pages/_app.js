import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import {
  ContractKitProvider,
  Alfajores,
  NetworkNames,
} from '@celo-tools/use-contractkit';
import '@celo/react-celo/lib/styles.css';
import ClientOnly from '@/components/ClientOnly';
import NavBar from '@/components/NavBar';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';


export default function App({ Component, pageProps }) {
 
  return (
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
        icon: 'https://example.com/icon.png',
      }}
    >
      <ClientOnly>
      <NavBar/>
        <Component {...pageProps} />
        <Loading/>
        <Alert/>
      </ClientOnly>
      <Toaster />
    </ContractKitProvider>
  );
}