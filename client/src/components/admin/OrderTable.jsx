import React, { useState, useEffect } from 'react'
import { getOrderAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/Ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateThai_s } from '../../utils/dateFormat'
import { getStatusColor } from '../../utils/statusColor'

const OrderTable = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetOrder(token)
    }, [])

    const handleGetOrder = (token) => {
        getOrderAdmin(token)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeStatus = (token, orderId, orderStatus) => {
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status Success')
                handleGetOrder(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th>ลำดับ</th>
                            <th>ผู้ใช้งาน</th>
                            <th>ที่อยู่จัดส่ง</th>
                            <th>วันที่</th>
                            <th>สินค้า</th>
                            <th>รวม</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index} className='border'>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>
                                            <p>{item.orderedBy.email}</p>
                                        </td>
                                        <td>
                                            <p>{item.orderedBy.address}</p>
                                        </td>
                                        <td className='text-center'>
                                            { dateThai_s(item.createdAt) }
                                        </td>
                                        <td className='px-2 py-4'>
                                            {
                                                item.products.map((product, index) =>
                                                    <li key={index}>
                                                        {product.product.title}
                                                        <span className='text-sm pl-4'>{product.count} x {product.product.price}</span>
                                                    </li>
                                                )
                                            }
                                        </td>
                                        <td className='text-center'>{ numberFormat(item.cartTotal) }</td>
                                        <td className='text-center'>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>
                                        <td className='text-center'>
                                            <select
                                                onChange={(e) => handleChangeStatus(token, item.id, e.target.value)}
                                                value={item.orderStatus}
                                            >
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Complated</option>
                                                <option>Cancel</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderTable