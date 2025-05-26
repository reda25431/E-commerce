import React from 'react'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user';
import { toast } from "react-toastify";
import { numberFormat } from '../../utils/number';

const CartCard = () => {
    const cart = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
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

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003366] to-blue-700 text-white p-4">
                <h1 className='text-xl font-bold flex items-center gap-3'>
                    <ShoppingCart size={24} />
                    ตะกร้าสินค้า
                    <span className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">
                        {cart.length}
                    </span>
                </h1>
            </div>
            <div className='p-4 max-h-full overflow-y-auto'>
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                    {cart.map((item, index) =>
                        <div className='group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300' key={index}>
                            {/* Item Header */}
                            <div className='flex justify-between items-start mb-3'>
                                <div className='flex gap-3 flex-1 min-w-0'>
                                    {/* Image */}
                                    <div className="flex-shrink-0">
                                        {item.images && item.images.length > 0 ? (
                                            <div className="relative overflow-hidden rounded-lg">
                                                <img
                                                    className='w-16 h-16 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105'
                                                    src={item.images[0].url}
                                                    alt={item.title}
                                                />
                                            </div>
                                        ) : (
                                            <div className='w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xs font-medium'>
                                                <div className="text-center">
                                                    <div className="text-lg mb-1">📦</div>
                                                    <div>No Image</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className='flex-1 min-w-0'>
                                        <p className='font-semibold text-gray-900 text-sm truncate group-hover:text-blue-700 transition-colors duration-300'>
                                            {item.title}
                                        </p>
                                        <p className='text-xs text-gray-600 mt-1 line-clamp-2'>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    className='p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 active:scale-95'
                                    onClick={() => actionRemoveProduct(item.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Quantity and Price */}
                            <div className='flex justify-between items-center'>
                                {/* Quantity Controls */}
                                <div className='flex items-center bg-white rounded-lg border border-gray-200 shadow-sm'>
                                    <button
                                        className='p-2 cursor-pointer hover:bg-gray-50 rounded-l-lg transition-colors duration-200 active:scale-95'
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                    >
                                        <Minus size={14} className="text-gray-600" />
                                    </button>
                                    <span className='px-3 py-2 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center bg-gray-50'>
                                        {item.count}
                                    </span>
                                    <button
                                        className='p-2 cursor-pointer hover:bg-gray-50 rounded-r-lg transition-colors duration-200 active:scale-95'
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                    >
                                        <Plus size={14} className="text-gray-600" />
                                    </button>
                                </div>

                                {/* Price */}
                                <div className='text-right'>
                                    <div className='font-bold text-blue-600 text-sm'>
                                        ฿{numberFormat(item.price * item.count)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Empty Cart State */}
                {cart.length === 0 && (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-2">
                            <ShoppingCart size={36} />
                        </div>
                        <p className="text-gray-500 font-medium">ตะกร้าสินค้าว่าง</p>
                        <p className="text-gray-400 text-sm mt-1">เพิ่มสินค้าเพื่อเริ่มการสั่งซื้อ</p>
                    </div>
                )}
                {/* Total Section */}
                {cart.length > 0 && (
                    <>
                        <div className='border-t border-gray-200 pt-4 mb-4'>
                            <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100'>
                                <div className='flex justify-between items-center'>
                                    <span className="text-gray-700 font-medium">ยอดรวมทั้งหมด</span>
                                    <div className="text-right">
                                        <div className='text-2xl font-bold text-blue-600'>
                                            ฿{numberFormat(getTotalPrice())}
                                        </div>
                                        <div className="text-xs text-gray-500">รวม VAT แล้ว</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="space-y-2">
                            {user ? (
                                <Link>
                                    <button
                                        disabled={cart.length < 1}
                                        className='group cursor-pointer w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none'
                                        onClick={handleSaveCart}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            ดำเนินการชำระเงิน
                                        </span>
                                    </button>
                                </Link>
                            ) : (
                                <Link to={'/login'}>
                                    <button className='group cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]'>
                                        <span className="flex items-center justify-center gap-2">
                                            เข้าสู่ระบบเพื่อชำระเงิน
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CartCard