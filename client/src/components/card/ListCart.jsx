import React from 'react'
import { List } from 'lucide-react';
import useEcomStore from '../../store/Ecom-store';
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user';
import { Trash2, Minus, Plus } from 'lucide-react';
import { toast } from "react-toastify";

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
        <div className='bg-gray-100 rounded-sm p-4 grid mx-5 my-10 md:mx-20 lg:mx-40 xl:mx-80'>
            <div className='flex gap-4'>
                <List size={36} />
                <p className='text-2xl font-bold mb-4'>รายการสินค้า {cart.length} รายการ</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='md:col-span-2'>
                    {
                        cart.map((item, index) =>
                            <div className='bg-white p-2 mb-2 rounded-md shadow-md' key={index}>
                                <div className='flex justify-between '>
                                    {/* left */}
                                    <div className='flex gap-2'>
                                        {
                                            item.images && item.images.length > 0
                                                ? <img
                                                    className='w-22 h-22 bg-gray-200 rounded-md flex text-center items-center'
                                                    src={item.images[0].url}
                                                />
                                                :
                                                <div className='w-22 h-22 bg-gray-200 rounded-md flex text-center items-center'>
                                                    No Image
                                                </div>
                                        }
                                        <div className=''>
                                            <div className='mb-2'>
                                                <p className='font-bold'>{item.title}</p>
                                                <p className='text-sm'>฿{item.price} x {item.count}</p>
                                            </div>
                                            <div className='w-32 border rounded-sm px-2 py-1 flex items-center'>
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
                                        </div>
                                    </div>

                                    {/* right */}
                                    <div>
                                        <div className='font-bold text-blue-500 mb-7'>
                                            ฿{item.price * item.count}
                                        </div>
                                        <div
                                            className='text-gray-600 rounded-md cursor-pointer px-2 py-1 border flex justify-center items-center gap-2'
                                            onClick={() => actionRemoveProduct(item.id)}
                                        >
                                            <Trash2 size={20} />
                                            ลบ
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    }
                </div>
                <div className='bg-white p-4 rounded-md shadow-md space-y-4 h-55'>
                    <p className='text-2xl font-bold'>ยอดรวม</p>
                    <div className='flex justify-between'>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl'>{getTotalPrice()}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            user
                                ? (<Link>
                                    <button
                                        className='bg-green-600 w-full rounded-md text-white py-2 shadow-md cursor-pointer hover:bg-green-700'
                                        onClick={handleSaveCart}
                                    >
                                        ชำระเงิน
                                    </button>
                                </Link>)
                                : (<Link to={'/login'}>
                                    <button
                                        className='bg-[#1A4D80] hover:bg-[#003366] w-full rounded-md text-white py-2 shadow-md cursor-pointer'
                                    >
                                        Login
                                    </button>
                                </Link>)
                        }
                        <Link to={'/shop'}>
                            <button
                                className='bg-gray-500 w-full rounded-md text-white py-2 shadow-md cursor-pointer hover:bg-gray-700'
                            >
                                แก้ไขสินค้า
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCart