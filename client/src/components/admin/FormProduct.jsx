import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import useEcomStore from '../../store/Ecom-store'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react';
import { numberFormat } from '../../utils/number'
import { dateThai_s } from '../../utils/dateFormat'

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })

    useEffect(() => {
        getCategory()
        getProduct()
    }, [])

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            setForm(initialState)
            getProduct()
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/product/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Confirm Delete')) {
            try {
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.error("ลบสินค้าเรียบร้อยแล้ว");
                getProduct();
            } catch (err) {
                console.log(err)
            }
        }
    }

    // กำหนดคอลัมน์สำหรับ DataTable
    const columns = [
        // No.
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">No.</span>,
            cell: (row, index) => (
                <div className="w-full text-center">
                    {index + 1}
                </div>
            ),
            width: '8%',
        },
        // Image
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">รูปภาพ</span>,
            cell: row =>
                row.images && row.images.length > 0 ? (
                    <div className="flex items-center justify-center w-full my-2">
                        <img
                            src={row.images[0].url}
                            alt="product"
                            className="w-24 h-24 rounded-lg shadow-md"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full my-2">
                        <div className="flex items-center justify-center w-24 h-24 rounded-md shadow-md bg-gray-200">
                            No Image
                        </div>
                    </div>
                ),
            width: '14%',
        },
        // Product
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">ชื่อสินค้า</span>,
            selector: row => row.title,
            sortable: true,
            width: '15%',
        },
        // Detail
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">รายละเอียดสินค้า</span>,
            selector: row => row.description,
            wrap: true,
            width: '17%',
        },
        // Price
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">ราคา</span>,
            selector: row => row.price,
            sortable: true,
            cell: row => <div className="text-center w-full">{numberFormat(row.price)}</div>,
            width: '8%',
        },
        // Quantity
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">จำนวน</span>,
            selector: row => row.quantity,
            sortable: true,
            cell: row => <div className="text-center w-full">{row.quantity}</div>,
            width: '8%',
        },
        // Sold
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">จำนวนที่ขาย</span>,
            selector: row => row.sold,
            sortable: true,
            cell: row => <div className="text-center w-full">{row.sold}</div>,
            width: '10%',
        },
        // Date Update 
        {
            name: <span className="text-base text-[#003366] font-bold text-center w-full">วันที่อัพเดต</span>,
            selector: row => row.updatedAt,
            sortable: true,
            cell: row => <div className="text-center w-full">{dateThai_s(row.updatedAt)}</div>,
            width: '10%',
        },
        // Manage
        {
            name: <div className="text-center text-base text-[#003366] font-bold w-full">จัดการ</div>,
            cell: row => (
                <div className="w-full flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-yellow-500 text-white cursor-pointer rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200"
                    >
                        <Pencil />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white cursor-pointer rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200"
                    >
                        <Trash2 />
                    </button>
                </div>
            ),
            width: '10%',
        }

    ];

    return (
        <div className='container mx-auto p-8 bg-white shadow-xl rounded-2xl'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-center text-[#003366] mb-2'>เพิ่มข้อมูลสินค้า</h1>
                <div className='h-1 w-20 bg-gradient-to-r from-[#003366] to-blue-500 mx-auto rounded-full'></div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Title Input */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>ชื่อสินค้า</label>
                        <input
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300'
                            type='text'
                            value={form.title}
                            onChange={handleOnChange}
                            placeholder='กรอกชื่อสินค้า'
                            name='title'
                        />
                    </div>

                    {/* Price Input */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>ราคา (บาท)</label>
                        <input
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300'
                            type='number'
                            value={form.price}
                            onChange={handleOnChange}
                            placeholder='0.00'
                            name='price'
                            min='0'
                            step='0.01'
                        />
                    </div>
                </div>

                {/* Description Input */}
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>รายละเอียดสินค้า</label>
                    <textarea
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none'
                        value={form.description}
                        onChange={handleOnChange}
                        placeholder='กรอกรายละเอียดสินค้า'
                        name='description'
                        rows='4'
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Quantity Input */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>จำนวนสินค้า</label>
                        <input
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300'
                            type='number'
                            value={form.quantity}
                            onChange={handleOnChange}
                            placeholder='จำนวน'
                            name='quantity'
                            min='0'
                        />
                    </div>

                    {/* Category Select */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700'>หมวดหมู่สินค้า</label>
                        <select
                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 bg-white cursor-pointer'
                            name='categoryId'
                            onChange={handleOnChange}
                            value={form.categoryId}
                            required
                        >
                            <option value="" disabled>เลือกหมวดหมู่</option>
                            {categories.map((item, index) =>
                                <option key={index} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                </div>

                {/* File Upload Component */}
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>รูปภาพสินค้า</label>
                    <div className='border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors duration-200'>
                        <Uploadfile form={form} setForm={setForm} />
                    </div>
                </div>

                {/* Submit Button */}
                <div className='pt-4'>
                    <button
                        type='submit'
                        className='w-full bg-gradient-to-r cursor-pointer from-[#003366] to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98]'
                    >
                        <span className='flex items-center justify-center gap-2'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                            </svg>
                            เพิ่มสินค้า
                        </span>
                    </button>
                </div>
                <hr className='my-4' />
                {/* <table className='Maintable w-full'>
                    <thead>
                        <tr>
                            <th scope='col'>No.</th>
                            <th scope='col'>รูปภาพ</th>
                            <th scope='col'>ชื่อสินค้า</th>
                            <th scope='col'>รายละเอียดสินค้า</th>
                            <th scope='col'>ราคา</th>
                            <th scope='col'>จำนวน</th>
                            <th scope='col'>จำนวนที่ขาย</th>
                            <th scope='col'>วันที่อัพเดต</th>
                            <th scope='col'>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {
                                                item.images.length > 0
                                                    ? <img className='w-24 h-24 rounded-lg shadow-md my-2' src={item.images[0].url} />
                                                    : <div className='w-24 h-24 rounded-md shadow-md my-2 bg-gray-200 flex items-center justify-center'>No Image</div>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updatedAt}</td>
                                        <td className='flex gap-2'>
                                            <p className='bg-yellow-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>
                                                <Link to={'/admin/product/' + item.id}><Pencil /></Link>
                                            </p>
                                            <p
                                                className='bg-red-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 />
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
                <DataTable
                    title="จัดการสินค้า"
                    columns={columns}
                    data={products}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                />
            </form>
        </div>
    )
}

export default FormProduct