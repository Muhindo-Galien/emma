'use client';
import React, { useState } from 'react'
import { truncate, useGlobalState } from '../store'
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import Identicon from 'react-identicons';
import { useContractKit } from '@celo-tools/use-contractkit';
import Link from 'next/link';

const NavBar = () => {
  const { connect, address } = useContractKit();
  const [opened, setOpened] = useState(false)
  const handleOpened = ()=>{
    setOpened(!opened)
  }
  const connectWallet= async() =>{
    try {
      await connect();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className=" sm:px-8 bg-white z-5 mx-auto w-full fixed shadow-sm">
        <div className=' flex items-center justify-between py-4 sm:mx-0 mx-4 '>
          <Link href={'/'}>
            <h1 className='font-black text-3xl'>Mu<span className='text-green-400'>ndo</span></h1>
          </Link>
          {/* tablet laptop */}
          <div className=''>
            <ul className='sm:flex justify-center gap-10 text-gray-500 hidden'>
              <Link href={'/'}>
                <li className='cursor-pointer'>Home</li>
              </Link>
              <Link href={'/about'}>
                <li className='cursor-pointer'>About</li>
              </Link>
              <Link href={'/orders'}>
                <li className='cursor-pointer'>My orders</li>
              </Link>
            </ul>
          </div>
          {/* phone */}
          <div className={opened?"block": "hidden"}>
              <ul className='fixed top-0 left-0 bottom-0 gap-3 flex flex-col shadow-xl overflow-hidden  h-48 w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto'>
              <Link href={'/'}>
                  <li className='cursor-pointer' onClick={()=>handleOpened()}>Home</li>
              </Link>
              <Link href={'/about'}>
                <li className='cursor-pointer' onClick={()=>handleOpened()}>About</li>
              </Link>
              <Link href={'/orders'}>
                <li className='cursor-pointer' onClick={()=>handleOpened()}>My orders</li>
              </Link>
                {address?
                ( <button disabled type='button' className='bg-green-400 px-3 py-2 rounded text-gray-50 font-semibold'>
                      {truncate(address,6,6,15)}
                  </button> ):(
                    <button type='button' className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50' onClick={()=>connectWallet()}>
                    Connect Wallet
                  </button> 
                  )}
              </ul>
          </div>

            <div className='flex gap-4 items-center'>
              {address?
               (<div className='flex items-center gap-2'>
                 <button disabled type='button' className='hidden sm:block bg-green-400 font-medium  px-3 py-2 rounded text-gray-50 my-1'>
                    {truncate(address,6,6,15)}
                </button>
                <Identicon
                string={address}
                size={35}
                className="rounded-full"
                />
               </div> 
               ):(
                  <button type='button' className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50' onClick={()=>connectWallet()}>
                  Connect Wallet
                </button> 
                )
              }
              {
                opened?(
                    <div class="sm:hidden block">
                        <MdClose className='text-3xl' onClick={()=>handleOpened()}/>
                    </div>
                ):(
                <div class="sm:hidden block">
                    <HiMenuAlt3 className='text-3xl' onClick={()=>handleOpened()}/>
                </div>
                )
              }
            </div>
          </div>
        </div>
  )
}

export default NavBar