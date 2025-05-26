import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';
import { numberFormat } from '../../utils/number';
import { motion } from "motion/react"

const ProductCard = ({ item }) => {
    const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <div className='group relative bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-2 w-36 mb-6 md:w-48 overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className='relative'>
                    {
                        item.images && item.images.length > 0
                            ? (
                                <div className="relative overflow-hidden rounded-md mb-3">
                                    <img className='w-full h-32 object-cover transition-transform duration-700 group-hover:scale-110' src={item.images[0].url} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl"></div>
                                </div>
                            )
                            : (
                                <div className='w-full h-32 rounded-xl text-center flex items-center justify-center shadow-inner bg-gradient-to-br from-gray-100 to-gray-200 mb-3 text-gray-500 font-medium'>
                                    <div className="text-center">
                                        <div className="text-xs">No Image</div>
                                    </div>
                                </div>
                            )
                    }
                </div>
                <div className='py-2 relative z-10 space-y-2'>
                    <p className='text-md font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-300'>{item.title}</p>
                    <p className='text-xs text-gray-600 truncate leading-relaxed'>{item.description}</p>
                </div>
                <div className='flex justify-between items-center relative z-10 pt-1'>
                    <div className="flex flex-col">
                        <span className='text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300'>฿{numberFormat(item.price)}</span>
                    </div>
                    <button
                        className='cursor-pointer relative bg-gradient-to-r from-[#003366] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-3 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group/btn overflow-hidden'
                        onClick={() => actionAddtoCart(item)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <ShoppingCart size={16} className="transition-transform duration-200 group-hover/btn:rotate-12" />
                        </div>
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard