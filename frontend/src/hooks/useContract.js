import { useEffect, useCallback, useState } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import contractAbi from '../abis/Mundo.json';
import { setGlobalState } from '@/store';
const contractAddress = '0xae526B74a690e91a2028bEf1e01001Ccc2173118';

export const useContract = () => {
  const { address, getConnectedKit } = useContractKit();
  const [contract, setContract] = useState();
  // let contract;/

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();
    // get a contract interface to interact with
    //@ts-ignore
    setContract(new kit.web3.eth.Contract(
      contractAbi.abi,
      contractAddress
    ));
  }, [getConnectedKit, contractAbi.abi, contractAddress]);
  
  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);
  setGlobalState('contract',contract)
  return contract;
};

