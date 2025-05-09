import React, { useState, useEffect } from 'react'
import { listUserCart, saveAddress } from "../../api/user"
import useEcomStore from '../../store/Ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const OrderCard = () => {
    const token = useEcomStore((state) => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [addressSave, setAddressSave] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        hdlGetUserCart(token)
    }, [])

    const hdlSaveAddress = () => {
        saveAddress(token, address)
        .then((res) => {
            if(!address) {
                return toast.warning('กรุณากรอกที่อยู่จัดส่ง')
            }
            console.log(res)
            toast.success('บันทึกที่อยู่จัดส่งสำเร็จ')
            setAddressSave(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const hdlGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleToPayment = () => {
        if(!addressSave) {
            return toast.warning('กรุณากรอกที่อยู่จัดส่ง')
        }
        navigate('/user/payment')
    }
    return (
        <div className='grid mx-5 my-10 md:mx-50 md:my-10'>
            <div className='flex gap-4'>
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-lg font-bold'>ที่อยู่ในการจัดส่ง</h1>
                        <textarea
                            className='w-full bg-white px-2 rounded-md'
                            placeholder='กรอกที่อยู่จัดส่ง'
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <button
                            className='border-[#1A4D80] bg-[#1A4D80] text-white rounded-md shadow-md px-4 py-2 cursor-pointer hover:bg-[#003366]'
                            onClick={hdlSaveAddress}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-lg font-bold'>Summary</h1>

                        {
                            products?.map((item, index) =>
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p className='font-bold'>Title: {item.product.title}</p>
                                            <p className='text-sm'>จำนวน: {item.count} x {numberFormat(item.product.price)}</p>
                                        </div>
                                        <div>
                                            <p className='text-red-500 font-bold'>
                                                ฿{ numberFormat(item.count * item.product.price) }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง</p>
                                <p>0.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>ส่วนลด</p>
                                <p>0.00</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>ยอดรวมสุทธิ:</p>
                                <p className='text-red-500 font-bold text-lg'>฿{ numberFormat(cartTotal)}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className='bg-green-600 text-white px-4 py-2 w-full rounded-md shadow-md cursor-pointer hover:bg-green-800'
                                onClick={handleToPayment}
                            >
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard