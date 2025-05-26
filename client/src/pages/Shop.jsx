import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/Ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'

const Shop = () => {

  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className='flex'>
      <div className="md:w-1/4 lg:w-1/5 p-4 h-screen">
        <SearchCard />
      </div>

      <div className='w-4/4 md:w-2/4 lg:w-3/5 p-4 h-screen md:overflow-y-auto'>
        <p className="text-3xl font-bold mb-4 text-center text-[#003366] tracking-wide">
          สินค้าทั้งหมด
        </p>
        <div className='flex flex-wrap gap-2 md:gap-3 !pl-3 !pr-3 ml-5 md:ml-10'>
          {
            products.map((item, index) =>
              <ProductCard key={index} item={item} />
            )
          }
        </div>
      </div>

      <div className='md:w-1/4 lg:w-1/5 p-4 h-screen overflow-y-auto'>
        <CartCard />
      </div>
    </div>
  )
}

export default Shop