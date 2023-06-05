import { toWei } from 'web3-utils';
import { setAlert, setGlobalState,getGlobalState, setLoadingMsg } from '@/store';
import { fromWei } from 'web3-utils';
import { toast } from 'react-hot-toast'

const getSingleProd =async(id,address)=>{
  if (!address) return alert('Please install Metamask')
  const contract = getGlobalState('contract')
  const singleProd =await contract?.methods.getItem(id).call()
  setGlobalState('product', singleProd)
}

const fetchOrders = async (address) => {
  const contract = getGlobalState('contract')
  const allOrders = []
  const orderNumber = await contract?.methods.orderCount(address).call()
  for(let i = 0; i < orderNumber; i++){
      const order = await contract?.methods.orders(address,i+1).call()
      allOrders.push(order)
  }
  setGlobalState('myorders',allOrders.reverse())
  return allOrders
}

const listProduct = async(address)=>{
  if (!address) return alert('Please install Metamask')
  const contract = getGlobalState('contract')
  const products = []
  for (var i = 0; i < 9; i++) {
    const item =  await contract?.methods.items(i+1).call()
    products.push(item)
  }
  setGlobalState('products',products)
  
  const electronics = products?.filter((item) => item?.category === 'electronics')
  const clothing = products?.filter((item) => item?.category === 'clothing')
  const toys = products?.filter((item) => item?.category === 'toys')
  setGlobalState('electronics',(electronics))
  setGlobalState('clothing',clothing)
  setGlobalState('toys',toys)
}

const buyHandler = async (id,cost,address) => {
  try {    
    const contract = getGlobalState('contract')
    cost = toWei(cost.toString(), 'ether')
    setLoadingMsg('Buy product')
    const result = await contract.methods.buy(id).send({ from: address,value: cost})
    if(result){
      setAlert('Ticket bought successfully', 'green');
      window.location.href = '/orders';
    }
  } catch (error) {
    console.log(error);
    setAlert('Purchase failed!', 'red');
  }
}


export {
  listProduct,
  buyHandler,
  getSingleProd,
  fetchOrders,
}