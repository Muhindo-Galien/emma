'use client';
import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../blockchain';
import { useGlobalState } from '../store'
import Loader from '../components/Loader';
import OderCard from '../components/OderCard';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContract } from '@/hooks/useContract';

const Orders = () => {
  const { address } = useContractKit();
  const [myorders] = useGlobalState('myorders')
  const contract = useContract();

  useEffect(()=>{  
    const loadSData =async()=>{
    await fetchOrders(address)
    }
    loadSData()
  },[contract])
  return (
    <>
        <div className='max-w-4xl mx-auto pt-24 text-gray-600 pb-10'>
          <h2 className='mx-5 text-center py-2 sm:py-5 font-bold text-2xl'>My orders</h2>
          { myorders?.length === 0?
            <Loader/>:
              myorders?.length >0?(<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 py-2.5 mx-4'>
              <OderCard myorders={myorders}/>
            </div>):(

              <div className='flex justify-center items-center'>
                <h1 className='font-bold text-green-400 pt-10'>You don't have any order yet!</h1>
              </div>
            )
            
          }
        </div>
    </>
  )
}

export default Orders