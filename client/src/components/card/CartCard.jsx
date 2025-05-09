import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react';
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
        <div>
            <h1 className='text-xl font-bold  mb-4'>ตะกร้าสินค้า</h1>
            <div className='border p-2'>
                {/* Card */}
                {
                    cart.map((item, index) =>
                        <div className='bg-white p-2 mb-2 rounded-md shadow-md' key={index}>
                            <div className='flex justify-between mb-2'>
                                <div className='flex gap-2'>
                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-18 h-18 bg-gray-200 rounded-md flex text-center items-center'
                                                src={item.images[0].url}
                                            />
                                            :
                                            <div className='w-18 h-18 bg-gray-200 rounded-md flex text-center items-center'>
                                                No Image
                                            </div>

                                    }
                                    <div className=''>
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </div>

                                <div className='text-red-600 p-2'>
                                    <Trash2 className='cursor-pointer' onClick={() => actionRemoveProduct(item.id)} />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='border rounded-sm px-2 py-1 flex items-center'>
                                    <button
                                        className='px-2 py-1 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-500'
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className='px-4'>{item.count}</span>
                                    <button
                                        className='px-2 py-1 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-500'
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className='font-bold text-blue-500'>
                                    ฿{ numberFormat(item.price * item.count) }
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Total */}
                <div className='flex justify-between px-2'>
                    <span>รวม</span>
                    <span>{numberFormat(getTotalPrice())}</span>
                </div>
                {/* Button */}

                {
                    user
                        ? (<Link>
                            <button
                                className='mt-4 bg-green-600 cursor-pointer text-white w-full py-2 rounded-md shadow-md hover:bg-green-700'
                                onClick={handleSaveCart}
                            >
                                ชำระเงิน
                            </button>
                        </Link>)
                        : (<Link to={'/login'}>
                            <button
                                className='mt-4 bg-[#1A4D80] hover:bg-[#003366] w-full rounded-md text-white py-2 shadow-md cursor-pointer'
                            >
                                Login
                            </button>
                        </Link>)
                }
                {/* <Link to={'/cart'}>
                    <button
                        className='mt-4 bg-green-600 cursor-pointer text-white w-full py-2 rounded-md shadow-md hover:bg-green-700'
                    >
                        ชำระเงิน
                    </button>
                </Link> */}
            </div>
        </div>
    )
}

export default CartCard