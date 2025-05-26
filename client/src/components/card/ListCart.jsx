import React from 'react'
import { List } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user';
import { Trash2, Minus, Plus } from 'lucide-react';
import { toast } from "react-toastify";
import { numberFormat } from '../../utils/number';

const ListCart = () => {
    const cart = useEcomStore((state) => state.carts)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                navigate('/checkout')
            })
            .catch((err) => {
                toast.warning(err.response.data.msg)
            })
    }

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header Section */}
                <div className='bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100'>
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-gradient-to-br from-blue-500 to-[#003366] rounded-xl text-white'>
                            <List size={24} />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-[#003366]'>รายการสินค้า</h1>
                            <p className='text-gray-600 mt-1'>{cart.length} รายการในตะกร้า</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Cart Items Section */}
                    <div className='lg:col-span-2 space-y-4'>
                        {cart.map((item, index) =>
                            <div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100' key={index}>
                                <div className='flex gap-6'>
                                    {/* Product Image */}
                                    <div className='flex-shrink-0'>
                                        {item.images && item.images.length > 0 ? (
                                            <div className='relative overflow-hidden rounded-xl'>
                                                <img
                                                    className='w-30 h-30 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105'
                                                    src={item.images[0].url}
                                                    alt={item.title}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl"></div>
                                            </div>
                                        ) : (
                                            <div className='w-30 h-30 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-medium'>
                                                <div className="text-center">
                                                    <div className="text-xs">No Image</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Product Details */}
                                    <div className='flex-1 min-w-0'>
                                        <div className='mb-4'>
                                            <h3 className='font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300'>{item.title}</h3>
                                            <p className='text-gray-600'>฿{numberFormat(item.price)} × {item.count}</p>
                                        </div>
                                        {/* Quantity Controls */}
                                        <div className='flex items-center bg-gray-50 rounded-xl p-1 w-fit border border-gray-200'>
                                            <button
                                                className='flex cursor-pointer items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 active:scale-95'
                                                onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                            >
                                                <Minus size={16} className="text-gray-600" />
                                            </button>
                                            <span className='px-6 py-2 font-semibold text-gray-900 min-w-[3rem] text-center'>{item.count}</span>
                                            <button
                                                className='flex cursor-pointer items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 active:scale-95'
                                                onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                            >
                                                <Plus size={16} className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Price and Actions */}
                                    <div className='flex flex-col items-end justify-between'>
                                        <div className='text-right mb-4'>
                                            <div className='text-2xl font-bold text-blue-600 mb-1'>
                                                ฿{numberFormat(item.price * item.count)}
                                            </div>
                                            <div className='text-sm text-gray-500'>รวม</div>
                                        </div>
                                        <button
                                            className='group/btn cursor-pointer flex items-center gap-2 px-4 py-3 text-red-600 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95'
                                            onClick={() => actionRemoveProduct(item.id)}
                                        >
                                            <Trash2 size={18} className="transition-transform duration-200 group-hover/btn:scale-110" />
                                            <span className="font-medium">ลบ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Summary Section */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>สรุปการสั่งซื้อ</h2>

                            {/* Price Breakdown */}
                            <div className='space-y-4 mb-6'>
                                <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                                    <span className='text-gray-600'>รวมสุทธิ</span>
                                    <span className='text-2xl font-bold text-gray-900'>฿{numberFormat(getTotalPrice())}</span>
                                </div>
                                <div className='flex justify-between items-center text-sm text-gray-500'>
                                    <span>ค่าจัดส่ง</span>
                                    <span>ฟรี</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='space-y-3'>
                                {user ? (
                                    <Link>
                                        <button
                                            disabled={cart.length < 1}
                                            className='group w-full cursor-pointer bg-gradient-to-r mb-4 from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none'
                                            onClick={handleSaveCart}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                ดำเนินการชำระเงิน
                                            </span>
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to={'/login'}>
                                        <button className='group cursor-pointer w-full bg-gradient-to-r mb-4 from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]'>
                                            <span className="flex items-center justify-center gap-2">
                                                เข้าสู่ระบบเพื่อชำระเงิน
                                            </span>
                                        </button>
                                    </Link>
                                )}

                                <Link to={'/shop'}>
                                    <button className='w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]'>
                                        <span className="flex items-center justify-center gap-2">
                                            เลือกซื้อสินค้าเพิ่ม
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCart