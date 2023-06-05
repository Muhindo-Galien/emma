import { fromWei } from 'web3-utils';
import Link from 'next/link';


const Card = ({item}) => {
  return (
    <div>
      <div className='p-4  rounded-xl shadow-lg font-globalFont bg-white ' >
            <img className='rounded-lg h-80 sm:h-60 w-full object-cover' src={item.image} alt="NFT" />
            <div className="flex items-center justify-between">
              <h2 className='my-2  text-gray-500 font-medium'> {item.name}</h2>
              <p className='font-medium text-green-400'>{fromWei(item.cost.toString(), 'ether')} CELO</p>
            </div>
            <Link href={`/product/${item.id}`}>
              <button className='px-6 py-3 shadow-lg bg-gray-100 text-gray-700 rounded-xl w-full'>View Details</button>
            </Link>
    </div>
    </div>
  )
}

export default Card