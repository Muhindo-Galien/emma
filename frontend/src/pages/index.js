import { fetchOrders, listProduct } from '@/blockchain';
import LandingPage from '@/components/LandingPage'
import { useContract } from '@/hooks/useContract';
import { useContractKit } from '@celo-tools/use-contractkit';
import Head from 'next/head'
import { useEffect } from 'react';

export default function Home() {
  const contract = useContract();
  const { address } = useContractKit();

  useEffect(() => {
    const loadData = async () => {
      await listProduct(address)
      await fetchOrders(address)
    }
    loadData();
  }, [contract, address]);

  return (
    <>
      <Head>
        <title>Mundo E-Commerce</title>
        <meta name="description" content="Mundo E-Commerce Dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <LandingPage/>
      </main>
    </>
  )
}
