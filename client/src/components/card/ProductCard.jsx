import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';
import { numberFormat } from '../../utils/number';

const ProductCard = ({ item }) => {
    const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

    return (
        <div className='border rounded-md shadow-md p-2 w-36 md:w-48'>
            <div>
                {
                    item.images && item.images.length > 0
                        ? <img className='w-full h-32 object-cover hover:scale-105 hover:duration-200 rounded-md shadow' src={item.images[0].url} />
                        : <div className='w-full h-32 rounded-md text-center flex items-center justify-center shadow bg-gray-200'>No Image</div>
                }
            </div>
            <div className='py-2'>
                <p className='text-md truncate'>{item.title}</p>
                <p className='text-xs text-gray-500 truncate'>{item.description}</p>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-sm font-bold'>฿{ numberFormat(item.price) }</span>
                <button
                    className='border text-[#002244] cursor-pointer rounded-md p-2 hover:bg-[#003366] hover:text-white'
                    onClick={()=>actionAddtoCart(item)}
                >
                    <ShoppingCart />
                </button>
            </div>
        </div>
    )
}

export default ProductCard