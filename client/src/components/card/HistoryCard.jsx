import React, { useState, useEffect } from 'react'
import { getOrder } from '../../api/user'
import useEcomStore from '../../store/Ecom-store'
import { numberFormat } from '../../utils/number'
import { dateThai_L } from '../../utils/dateFormat'
import { getStatusColor } from '../../utils/statusColor'

const HistoryCard = () => {
    const [orders, setOrders] = useState([])
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        hdlGetOrders(token)
    }, [])

    const hdlGetOrders = (token) => {
        getOrder(token)
            .then((res) => {
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>ประวัติการสั่งซื้อ</h1>

            <div className='space-y-4'>
                {/* loop order */}
                {
                    orders?.map((item, index) =>
                        <div className='bg-gray-100 p-4 rounded-md shadow-md' key={index}>
                            <div className='flex justify-between mb-2'>
                                <div>
                                    <p className='text-sm'>Order date</p>
                                    <p className='font-bold'>{dateThai_L(item.updatedAt)}</p>
                                </div>
                                <div>
                                    <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                        {item.orderStatus}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <table className='border w-full'>
                                    <thead>
                                        <tr className='bg-gray-200'>
                                            <th>สินค้า</th>
                                            <th>ราคา</th>
                                            <th>จำนวน</th>
                                            <th>รวม</th>
                                        </tr>
                                    </thead>
                                    {/* loop product */}
                                    <tbody>
                                        {
                                            item.products?.map((product, index) => {
                                                // console.log(product)
                                                return (
                                                    <tr key={index}>
                                                        <td>{product.product.title}</td>
                                                        <td>{numberFormat(product.product.price)}</td>
                                                        <td>{product.count}</td>
                                                        <td>{numberFormat(product.count * product.product.price)}</td>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <div className='text-right'>
                                    <p>ราคาสุทธิ</p>
                                    <p>{numberFormat(item.cartTotal)}</p>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default HistoryCard